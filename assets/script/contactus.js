document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formError = document.getElementById('form-error-space');
  formError.style.display = 'none'; // Hide error by default

  // Check required fields manually (excluding email)
  const requiredFields = [
    'entry.239742720', // First Name
    'entry.1985792122', // Last Name
    'entry.1263058962', // Phone
    'entry.1130641167'  // Message
  ];

  let allFilled = requiredFields.every(name => {
    const field = form.querySelector(`[name="${name}"]`);
    return field && field.value.trim() !== '';
  });

  if (!allFilled) {
    formError.style.display = 'block';
    return;
  }

  const formData = new FormData(form);

  fetch('https://docs.google.com/forms/d/e/1FAIpQLSd7zD5aMZ_PqywtfLQS5z6B68qFP4F34aTTOL5lF7lQxDNmhQ/formResponse', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  }).then(() => {
    document.getElementById('form200Page').classList.add('active');
    form.reset();
  }).catch((err) => {
	formError.innerText = `很抱歉，表单提交失败了。这就是我们所看到的错误: ${err}`
    formError.style.display = 'block';
    console.error('Submission failed', err);
  });
});
