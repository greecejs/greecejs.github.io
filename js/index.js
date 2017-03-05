(function() {

  var form = document.getElementById("slack-invite-form")
  var emailInput = form.querySelector("input[type='text']")

  var slack = new Slack()
  slack.init({
    emailInput: emailInput,
    form: form
  })
})()