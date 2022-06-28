$(function () {
  const pass_n1 = $("#primer-pass");
  const pass_n2 = $("#segundo-pass");

  const msg = $("#msg-valid");

  pass_n2.on("keyup", function () {
    if (pass_n1.val() === pass_n2.val()) {
      pass_n2.removeClass("is-invalid");
      msg.addClass("valid-feedback");
      msg.text("Contraseñas coinciden");
      pass_n2.addClass("is-valid");
      msg.removeClass("invalid-feedback");
    } else {
      pass_n2.addClass("is-invalid");
      pass_n2.removeClass("is-valid");
      msg.addClass("invalid-feedback");
      msg.text("Contraseñas no coinciden");
      msg.removeClass("valid-feedback");
    }
  });
});
