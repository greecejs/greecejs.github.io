(function() {

  var form = document.getElementById("slack-invite-form")
  var emailInput = form.querySelector("input[type='text']")
  var submitButton = form.querySelector("button[type='submit']")

  var slack = new Slack()
  slack.init({
    emailInput: emailInput,
    form: form,
    submitButton: submitButton
  })
})()