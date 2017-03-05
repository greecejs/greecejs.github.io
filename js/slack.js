/*
**  Slack.js v0.0.1
*   Author: Nick Rossolatos
*   Date: 5/3/2017
*
*   Author Notes: It is written in a little overcomplicated way. Since this repo is used as 
*                 training grounds, i wanted to create a function that would have "private" functions
*                 that weren't exposed to the window object, without sacrifising the garbage collecting.
*                 Idea taken from here: http://stackoverflow.com/questions/55611/javascript-private-methods
 */


var Slack = (function() {

  var errorCodes = {
    INVALID_FORM_ELEMENT: 0,
    MISSING_ELEMENTS: 1,
    INVALID_INPUT_ELEMENT: 2,
    INVALID_EMAIL: 3
  }

  function Slack(options) {
    this.o = options || {}
    this.o.debug = this.o.debug || true
  }

  Slack.api_key = "ykOUjZOB7b6nqP0hn3wtHaoNDpPmqNba3yfNaENx"
  Slack.subscribe_url = "https://9f7ljkeax6.execute-api.eu-west-1.amazonaws.com/prod/slack?"

  Slack.prototype.init = function(elements) {
    if(!elements) {
      _handleErrors(errorCodes.MISSING_ELEMENTS)
      return false
    }
    if(!elements.form || !_isElement(elements.form)) {
      _handleErrors(errorCodes.INVALID_FORM_ELEMENT)
      return false 
    }
    if(!elements.emailInput || !_isElement(elements.emailInput)) {
      _handleErrors(errorCodes.INVALID_INPUT_ELEMENT)
      return false 
    }

    this.form = elements.form
    this.emailInput = elements.emailInput

    _attachEventListeners.call(this)
  }

  function _handleErrors(err) {

    // if(o.debug === false)

    if(err === errorCodes.INVALID_FORM_ELEMENT) {
      console.error("Slack.js: Slack.prototype.init: a form element needs to be provided.")
    }
    if(err === errorCodes.INVALID_INPUT_ELEMENT) {
      console.error("Slack.js: Slack.prototype.init: a text input element needs to be provided.")
    }
    if(err === errorCodes.INVALID_EMAIL) {
      console.error("Slack.js: Email entered is invalid")
    }
    if(err === errorCodes.MISSING_ELEMENTS) {
      console.error("Slack.js: new Slack().init needs to be provided with the form and the input element.")
    }

  }

  function _handleFormSubmit(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    _subscribe.call(this, this.emailInput.value)
  }

  function _subscribe(email) {
    _sendRequestToSlackAPI(email, function(err, response){
      if(err) 
        _handleErrors(err)
      console.log("response from _subscribe", response)
    })
  }

  function _attachEventListeners() {
    this.form.addEventListener("submit", _handleFormSubmit.bind(this))
    // this.submitButton.addEventListener("click", this.handleSubmit.bind(this))
  }


  function _isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement :
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    )
  }

  function _sendRequestToSlackAPI(email, cb) {

    if(!_isValidEmail(email)) {
      return cb(errorCodes.INVALID_EMAIL)
    }
    var request = new XMLHttpRequest()

    var url = Slack.subscribe_url + "&email=" + email
    // request.withCredentials = true
    request.open("GET", url)
    request.setRequestHeader("Content-Type", "application/json")
    request.setRequestHeader("x-api-key", Slack.api_key)
    request.addEventListener("load", function(event) {
      var status = this.status

      // TODO: handle responses better
      try {
        var response = JSON.parse(this.response)
      } catch(e) {
        response = this.response
      }
      
      return cb(null, response, status)

    })
    request.send()
  }


  function _isValidEmail(email) {
    if(!email || !email.length){
     return false
   } else if(!(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email))){
     return false
   }

   return true
  }
  return Slack 
})()