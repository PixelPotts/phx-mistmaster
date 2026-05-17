/* PHX MistMaster — Multi-step Form & Validation JS */

document.addEventListener('DOMContentLoaded', () => {
  initMultiStepForm();
  initContactForm();
  initBookingForm();
});

function initMultiStepForm() {
  const form = document.querySelector('.multi-step-form');
  if (!form) return;

  const panels = form.querySelectorAll('.form-panel');
  const indicators = document.querySelectorAll('.form-step-indicator');
  let currentStep = 0;

  function showStep(index) {
    panels.forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });
    indicators.forEach((ind, i) => {
      ind.classList.remove('active', 'completed');
      if (i < index) ind.classList.add('completed');
      if (i === index) ind.classList.add('active');
    });
    currentStep = index;
  }

  form.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (validatePanel(panels[currentStep])) {
        showStep(currentStep + 1);
      }
    });
  });

  form.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showStep(currentStep - 1);
    });
  });

  form.addEventListener('submit', (e) => {
    if (!validatePanel(panels[currentStep])) {
      e.preventDefault();
      return;
    }
    // Show success message
    e.preventDefault();
    const successEl = form.querySelector('.success-message');
    if (successEl) {
      panels.forEach(p => p.classList.remove('active'));
      successEl.style.display = 'block';
      document.querySelector('.form-steps').style.display = 'none';
    }
    // Submit via fetch to Formspree
    submitForm(form);
  });

  showStep(0);
}

function validatePanel(panel) {
  let valid = true;
  const fields = panel.querySelectorAll('[required]');

  fields.forEach(field => {
    const group = field.closest('.form-group');
    if (!field.value.trim()) {
      if (group) group.classList.add('error');
      valid = false;
    } else {
      if (group) group.classList.remove('error');
    }

    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        if (group) group.classList.add('error');
        valid = false;
      }
    }

    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\(\)\+]{7,}$/;
      if (!phoneRegex.test(field.value)) {
        if (group) group.classList.add('error');
        valid = false;
      }
    }
  });

  return valid;
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        if (group) group.classList.add('error');
        valid = false;
      } else {
        if (group) group.classList.remove('error');
      }
    });

    if (valid) {
      submitForm(form);
      const successEl = form.querySelector('.alert-success') || createSuccessAlert(form);
      successEl.style.display = 'block';
      form.reset();
    }
  });
}

function initBookingForm() {
  const form = document.querySelector('.booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateInput = form.querySelector('input[name="preferred_date"]');
    const timeInput = form.querySelector('input[name="preferred_time"]');

    if (!dateInput.value || !timeInput.value) {
      alert('Please select a date and time slot.');
      return;
    }

    if (validatePanel(form)) {
      submitForm(form);
      const successEl = form.querySelector('.success-message');
      if (successEl) successEl.style.display = 'block';
      form.querySelector('.booking-layout').style.display = 'none';
    }
  });
}

function submitForm(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Formspree endpoint (replace with actual endpoint)
  fetch('https://formspree.io/f/your-form-id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  }).catch(() => {
    // Silently handle — form success UI is already shown
    console.log('Form data:', data);
  });
}

function createSuccessAlert(form) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-success';
  alert.textContent = 'Thank you! We\'ll be in touch within 24 hours.';
  alert.style.display = 'none';
  form.prepend(alert);
  return alert;
}
