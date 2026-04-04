import { useState , useRef, useEffect } from "react";
import "./App.css";

// Images
import logoArcade from "./assets/images/icon-arcade.svg";
import logoAdvanced from "./assets/images/icon-advanced.svg";
import logoPro from "./assets/images/icon-pro.svg";
import logoCompleted from "./assets/images/icon-thank-you.svg";

function App() {
  // Refs
  const componentHolder = useRef(null);

  /* inputs */
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  // Main Container
  function MainContainer() {
    return (
      <main className="form-main-container">
        <LeftPart></LeftPart>
        <RightPart></RightPart>
      </main>
    )
  }

  // Left Part of Main Container
  function LeftPart() {
    return (
      <section className="form-left-part">
        <div className="form-step-content">
          <div className={currentPart === 1 ? "form-circle active" : "form-circle"}>
            <p>1</p>
          </div>
          <div className="form-step-txt">
            <h1>STEP 1</h1>
            <p>YOUR INFO</p>
          </div>
        </div>
        <div className="form-step-content">
          <div className={currentPart === 2 ? "form-circle active" : "form-circle"}>
            <p>2</p>
          </div>
          <div className="form-step-txt">
            <h1>STEP 2</h1>
            <p>SELECT PLAN</p>
          </div>
        </div>
        <div className="form-step-content">
          <div className={currentPart === 3 ? "form-circle active" : "form-circle"}>
            <p>3</p>
          </div>
          <div className="form-step-txt">
            <h1>STEP 3</h1>
            <p>ADD-ONS</p>
          </div>
        </div>
        <div className="form-step-content">
          <div className={currentPart === 4 ? "form-circle active" : "form-circle"}>
            <p>4</p>
          </div>
          <div className="form-step-txt">
            <h1>STEP 4</h1>
            <p>SUMMARY</p>
          </div>
        </div>
      </section>
    )
  }

  // Right Part of Main Container
  function RightPart() {
    return (
      <div className="component-holder" ref={componentHolder}>
        <PersonalInfo></PersonalInfo>
        <SelectYourPlan></SelectYourPlan>
        <PickAddOns></PickAddOns>
        <FinishingUp></FinishingUp>
        <ThankYou></ThankYou>
      </div>
    )
  }

  // Personal Info
  function PersonalInfo() {
    // Validation for Personal Info
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    // Input Values
    const [name, setName] = useState(sessionStorage.getItem("nameStorage" || ""));
    const [email, setEmail] = useState(sessionStorage.getItem("emailStorage" || ""));
    const [phone, setPhone] = useState(sessionStorage.getItem("phoneStorage" || ""));

    // RegEx
    const SPECIAL_CHARACTERS = /[!@#$%^&*()\-+={}[\]:;"'<>?,.\/|\\]/;
    const NAME_VALIDATION = /^[a-z ,.']+$/i;
    const EMAIL_VALIDATION = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_VALIDATION = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    /* hasError Check */
    let hasError = false;

    // Reset Session Storage After Page Refresh
    useEffect(() => {
      // Save to Session Storage
      sessionStorage.setItem("nameStorage", name);
      sessionStorage.setItem("emailStorage", email);
      sessionStorage.setItem("phoneStorage", phone);

      // Clear All Data from Session Storage Function
      const handleBeforeUnload = () => {
        sessionStorage.clear();
      }

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    }, [name, email, phone]);

    const infoValidation = () => {
      // Check for Names
      if (name === "" || name === null) {
        setNameError("Please enter your name.");
        hasError = true;
      } else if (!NAME_VALIDATION.test(name) || SPECIAL_CHARACTERS.test(name)) {
        setNameError("Invalid name characters.");
        hasError = true;
      } else {
        setNameError("");
      }

      // Check for Email
      if (email === "" || email === null) {
        setEmailError("Please enter your email.");
        hasError = true;
      } else if (!EMAIL_VALIDATION.test(email)) {
        setEmailError("Invalid email input.");
        hasError = true;
      } else {
        setEmailError("")
      }

      // Check for Phone
      if (phone === "" || phone === null) {
        setPhoneError("Please enter your phone number.");
        hasError = true;
      } else if (!PHONE_VALIDATION.test(phone)) {
        setPhoneError("Invalid phone number.");
        hasError = true;
      } else {
        setPhoneError("");
      }

      console.log(hasError);

      // Check for "hasError"
      if (hasError === true) {
        return;
      } else {
        // Call This Function
        nextPart();
      }
    }

    /* style={currentPart === Number.parseInt(pageIndex[0]) ? {display: "flex"} : {display: "none"}} */

    return (
      <section className={currentPart === pageIndex[0] ? "form-personal-info-container active-animation" : "form-personal-info-container"}>
        <div className="form-top-part">
          <h1>Personal Info</h1>
          <p>Please provide your name, email address, and phone number.</p>
        </div>

        <div className="form-input-holder">
          <div className="form-part">
            <div className="form-part-txt">
              <label htmlFor="nameId">Name</label>
              {nameError && <p className="error-msg">{nameError}</p>}
            </div>
            <input 
              ref={nameRef}
              id="nameId" 
              className={nameError ? "error" : ""} 
              type="text" 
              placeholder="e.g Stephen King" 
              value={name || ""} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-part">
            <div className="form-part-txt">
              <label htmlFor="emailId">Email Address</label>
              {emailError && <p className="error-msg">{emailError}</p>}
            </div>
            <input 
              ref={emailRef}
              id="emailId" 
              className={emailError ? "error" : ""} 
              type="text" 
              placeholder="e.g stephenking@lorem.com" 
              value={email || ""} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-part">
            <div className="form-part-txt">
              <label htmlFor="phoneId">Phone Number</label>
              {phoneError && <p className="error-msg">{phoneError}</p>}
            </div>
            <input 
              ref={phoneRef}
              id="phoneId" 
              className={phoneError ? "error" : ""} 
              type="tel" 
              placeholder="e.g +1 234 567 890" 
              value={phone || ""} 
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <button className="next-btn" type="button" onClick={infoValidation}>Next step</button>
      </section>
    )
  }

  // Select Your Plan
  function SelectYourPlan() {
    // Load from Session Storage
    let storedArcade = sessionStorage.getItem("arcadeStorage");
    let storedAdvanced = sessionStorage.getItem("advancedStorage");
    let storedPro = sessionStorage.getItem("proStorage");
    let storedSwitch = sessionStorage.getItem("switchStorage");

    // Intentional Conversion (String => Boolean)
    let isStoredTrue = (storedSwitch === 'true');

    /* would be better if I put those sessionStorage in global scope :/ */

    let [isArcade, setIsArcade] = useState(storedArcade || "false");
    let [isAdvanced, setIsAdvanced] = useState(storedAdvanced || "false");
    let [isPro, setIsPro] = useState(storedPro || "false");
    let [isSwitched, setIsSwitched] = useState(isStoredTrue || false);

    // Plan Validation
    const planValidation = () => {
      if (isArcade === "true" || isAdvanced === "true" || isPro === "true") {
        nextPart();
      } else {
        // Notify the user to select a plan
        alert("Please select a plan.");
        return;
      }
    }

    // Monthly or Yearly
    const switchPlan = () => {
      setIsSwitched((prev) => !prev);
      console.log(isSwitched);
    }

    // Session Storage for Plan Selection
    sessionStorage.setItem("arcadeStorage", isArcade);
    sessionStorage.setItem("advancedStorage", isAdvanced);
    sessionStorage.setItem("proStorage", isPro);
    sessionStorage.setItem("switchStorage", isSwitched);

    /* style={currentPart === Number.parseInt(pageIndex[1]) ? {display: "flex"} : {display: "none"}} */

    return (
      <section className={currentPart === pageIndex[1] ? "form-select-plan-container active-animation" : "form-select-plan-container"}>
        <div className="form-top-part">
          <h1>Select your plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </div>

        <div className="form-option-holder">
          <div 
            className={storedArcade === "true" ? "form-option selected" : "form-option"} 
            onClick={() => {
              setIsArcade("true");
              setIsAdvanced("false");
              setIsPro("false");
            }}
          >
          <img src={logoArcade} alt="img-logo" />
          <div className="form-desc">
            <h1>Arcade</h1>
            <p>{isSwitched === false ? "$9/mo" : "$90/yr"}</p>
            {isSwitched !== false && <p>2 months free</p>}
          </div>
          </div>
          <div 
            className={storedAdvanced === "true" ? "form-option selected" : "form-option"} 
            onClick={() => {
              setIsArcade("false");
              setIsAdvanced("true");
              setIsPro("false");
            }}
          >
            <img src={logoAdvanced} alt="img-logo" />
            <div className="form-desc">
              <h1>Advanced</h1>
              <p>{isSwitched === false ? "$12/mo" : "$120/yr"}</p>
              {isSwitched !== false && <p>2 months free</p>}
            </div>
          </div>
          <div 
            className={storedPro === "true" ? "form-option selected" : "form-option"} 
            onClick={() =>  {
              setIsArcade("false");
              setIsAdvanced("false");
              setIsPro("true");
            }}
          >
            <img src={logoPro} alt="img-logo" />
            <div className="form-desc">
              <h1>Pro</h1>
              <p>{isSwitched === false ? "$15/mo" : "$150/yr"}</p>
              {isSwitched !== false && <p>2 months free</p>}
            </div>
          </div>
        </div>

        <div className="form-plan-toggle">
          <p>Monthly</p>
          <label className="switch">
            <input type="checkbox" className="check-box" checked={isStoredTrue === true} onChange={switchPlan}/>
            <span className="slider round"></span>
          </label>
          <p>Yearly</p>
        </div>

        <div className="form-plan-bottom-btns">
          <p className="prev-btn" onClick={prevPart}>Go back</p>
          <button className="next-btn" type="button" onClick={planValidation}>Next step</button>
        </div>
      </section>
    )
  }

  // Pick Add-Ons
  function PickAddOns() {
    // Session Storage for Pick-Add-Ons
    /* pick add-ons */
    let storedOnline = sessionStorage.getItem("onlineStorage");
    let storedLarger = sessionStorage.getItem("largerStorage");
    let storedCustom = sessionStorage.getItem("customStorage");

    /* load from 'Select Plan' */
    let storedSwitch = sessionStorage.getItem("switchStorage");

    // Intentional Conversion (String => Boolean)
    let isOnlineTrue = (storedOnline === 'true');
    let isLargerTrue = (storedLarger === 'true');
    let isCustomTrue = (storedCustom === 'true');

    const [isOnline, setIsOnline] = useState(isOnlineTrue || false);
    const [isLarger, setIsLarger] = useState(isLargerTrue || false);
    const [isCustom, setIsCustom] = useState(isCustomTrue || false);

    const pickAddOnsCheck = () => {
      if (isOnline === false && isLarger === false && isCustom === false) {
        // Notify the user to select at least one add-on
        alert("Please select at least one add-on.");
        return;
      } else {
        nextPart();
      }
    }

    sessionStorage.setItem("onlineStorage", isOnline);
    sessionStorage.setItem("largerStorage", isLarger);
    sessionStorage.setItem("customStorage", isCustom);

    /* style={currentPart === Number.parseInt(pageIndex[2]) ? {display: "flex"} : {display: "none"}} */

    return (
      <section className={currentPart === pageIndex[2] ? "pick-add-ons-container active-animation" : "pick-add-ons-container"}>
        <div className="form-top-part">
          <h1>Pick add-ons</h1>
          <p>Add-ons help enhance your gaming experience.</p>
        </div>

        <div className="pick-add-ons-holder">
          <div className={isOnlineTrue === true ? "pick-options selected" : "pick-options"} onClick={() => setIsOnline((prev) => !prev)}>
            <div className="pick-flex-start">
              <input id="online" className="pick-checkbox" type="checkbox" checked={isOnlineTrue === true} readOnly/>
              <div className="pick-txt">
                <h1>Online service</h1>
                <p>Access to multiplayer games</p>
              </div>
            </div>
            <p>{storedSwitch === "false" ? "+$1/mo" : "+$10/yr"}</p>
          </div>
          <div className={isLargerTrue === true ? "pick-options selected" : "pick-options"} onClick={() => setIsLarger((prev) => !prev)}>
            <div className="pick-flex-start">
              <input id="storage" className="pick-checkbox" type="checkbox" checked={isLargerTrue === true} readOnly/>
              <div className="pick-txt">
                <h1>Larger storage</h1>
                <p>Extra 1TB of cloud save</p>
              </div>
            </div>
            <p>{storedSwitch === "false" ? "+$2/mo" : "+$20/yr"}</p>
          </div>
          <div className={isCustomTrue === true ? "pick-options selected" : "pick-options"} onClick={() => setIsCustom((prev) => !prev)}>
            <div className="pick-flex-start">
              <input id="customizable" className="pick-checkbox" type="checkbox" checked={isCustomTrue === true} readOnly/>
              <div className="pick-txt">
                <h1>Customizable profile</h1>
                <p>Custom theme on your profile</p>
              </div>
            </div>
            <p>{storedSwitch === "false" ? "+$2/mo" : "+$20/yr"}</p>
          </div>
        </div>

        <div className="form-plan-bottom-btns">
          <p className="prev-btn" onClick={prevPart}>Go back</p>
          <button className="next-btn" type="button" onClick={pickAddOnsCheck}>Next step</button>
        </div>
      </section>
    )
  }

  // Finishing Up
  function FinishingUp() {
    let storedArcade = sessionStorage.getItem("arcadeStorage");
    let storedAdvanced = sessionStorage.getItem("advancedStorage");
    let storedPro = sessionStorage.getItem("proStorage");

    /* load from 'Select Plan' */
    let storedSwitch = sessionStorage.getItem("switchStorage");

    /* pick add-ons */
    let storedOnline = sessionStorage.getItem("onlineStorage");
    let storedLarger = sessionStorage.getItem("largerStorage");
    let storedCustom = sessionStorage.getItem("customStorage");

    /* style={currentPart === Number.parseInt(pageIndex[3]) ? {display: "flex"} : {display: "none"}} */

    return (
      <section className={currentPart === pageIndex[3] ? "finishing-up-container active-animation" : "finishing-up-container"}>
        <div className="form-top-part">
          <h1>Finishing Up</h1>
          <p>Double-check everything looks OK before confirming.</p>
        </div>

        <div className="finishing-up-info-holder">
          <div className="plan-info">
            <div className="plan-txt">
              {storedArcade === "true" && <p>Arcade</p>}
              {storedAdvanced === "true" && <p>Advanced</p>}
              {storedPro === "true" && <p>Pro</p>}
              <p onClick={loadSelectPlan}>Change</p>
            </div>
            {storedArcade === "true" && <p className="plan-info-price">{storedSwitch === "false" ? `$${9}/mo` : `$${90}/yr`}</p>}
            {storedAdvanced === "true" && <p className="plan-info-price">{storedSwitch === "false" ? `$${12}/mo` : `$${120}/yr`}</p>}
            {storedPro === "true" && <p className="plan-info-price">{storedSwitch === "false" ? `$${15}/mo` : `$${150}/yr`}</p>}
          </div>
          <div className="add-ons-info">
            {storedOnline === "true" && <div id="online-service" className="add-ons-txt">
              <p>Online service</p>
              <p>{storedSwitch === "false" ? `$${1}/mo` : `$${10}/yr`}</p>
            </div>}
            {storedLarger === "true" && <div id="larger-storage" className="add-ons-txt">
              <p>Larger storage</p>
              <p>{storedSwitch === "false" ? `$${2}/mo` : `$${20}/yr`}</p>
            </div>}
            {storedCustom === "true" && <div id="customizable-profile" className="add-ons-txt">
              <p>Customizable profile</p>
              <p>{storedSwitch === "false" ? `$${2}/mo` : `$${20}/yr`}</p>
            </div>}
            <div className="total-price">
              <p>Total {storedSwitch === "false" ? `(per month)` : `(per year)`}</p>
              <p>
                {
                  /* Calculate Total Price */
                  (() => {
                    let total = 0;
                    /* Select Your Plan */
                    if (storedArcade === "true") {
                      total += storedSwitch === "false" ? 9 : 90;
                    }
                    if (storedAdvanced === "true") {
                      total += storedSwitch === "false" ? 12 : 120;
                    }
                    if (storedPro === "true") {
                      total += storedSwitch === "false" ? 15 : 150;
                    }
                    /* Pick Add-ons */
                    if (storedOnline === "true") {
                      total += storedSwitch === "false" ? 1 : 10;
                    }
                    if (storedLarger === "true") {
                      total += storedSwitch === "false" ? 2 : 20;
                    }
                    if (storedCustom === "true") {
                      total += storedSwitch === "false" ? 2 : 20;
                    }
                    return (`$${total}${storedSwitch === "false" ? "/mo" : "/yr"}`);
                  })()
                }
              </p>
            </div>
          </div>

          <div className="form-plan-bottom-btns">
            <p className="prev-btn" onClick={prevPart}>Go back</p>
            <button className="confirm-btn" onClick={nextPart}>Confirm</button>
          </div>
        </div>
      </section>
    )
  }

  /* style={currentPart === Number.parseInt(pageIndex[4]) ? {display: "flex"} : {display: "none"}} */

  // Thank You!
  function ThankYou() {
    return (
      <section className={currentPart === pageIndex[4] ? "thank-you-container active-animation" : "thank-you-container"}>
        <img src={logoCompleted} alt="img-logo" />
        <h1>Thank you!</h1>
        <p>
          Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
        </p>
      </section>
    )
  }

  // =====================================================================
  // FUNCTIONS
  // =====================================================================

  // Page Index Array with Numbers
  const pageIndex = [1, 2, 3, 4, 5];

  let [currentPart, setCurrentPart] = useState(1);

  const nextPart = () => {
    // Increment
    setCurrentPart((prev) => prev + 1);
    console.log(currentPart);
  }

  const prevPart = () => {
    // Decrement
    setCurrentPart((prev) => prev - 1);
    console.log(currentPart);
  }

  const loadSelectPlan = () => {
    setCurrentPart(2);
  }

  return (
    <MainContainer>
    </MainContainer>
  )
}

export default App;
