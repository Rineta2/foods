//================= Hamburger =================//

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const close = document.getElementById("close");
  const navUl = document.querySelector(".nav ul");
  const navLinks = document.querySelectorAll(".nav ul li a");

  hamburger.addEventListener("click", function () {
    navUl.classList.toggle("show");
  });

  close.addEventListener("click", function () {
    navUl.classList.remove("show");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navUl.classList.remove("show");
    });
  });
});

//================= Active Link =================//

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  function setActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
});

//================= Sticky =================//

window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

//================= Parallax =================//

(function () {
  var parallax = document.querySelector(".parallax");

  function handleScroll() {
    var scrolled = window.scrollY;
    parallax.style.transform = "translateY(" + scrolled * 0.5 + "px)";
  }

  window.addEventListener("scroll", handleScroll);
})();

//================= Preview Modal =================//

(function () {
  const previewModal = document.getElementById("myModal");
  const previewCloseBtn = previewModal.querySelector(".close");

  previewCloseBtn.addEventListener("click", function () {
    closeModal();
  });

  window.addEventListener("click", function (event) {
    if (event.target === previewModal) {
      closeModal();
    }
  });

  function closeModal() {
    previewModal.classList.remove("active");
    removeActiveClass();
  }

  function removeActiveClass() {
    document.querySelectorAll(".viewport.active").forEach(function (button) {
      button.classList.remove("active");
    });
  }

  document.querySelectorAll(".viewport").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      removeActiveClass();

      this.classList.add("active");

      const title = this.getAttribute("data-title");
      const description = this.getAttribute("data-description");
      const price = this.getAttribute("data-price");
      const image = this.getAttribute("data-image");

      document.getElementById("modal-title").textContent = title;
      document.getElementById("modal-description").textContent = description;
      document.getElementById("modal-price").textContent = price;
      document.getElementById("modal-image").src = image;

      previewModal.classList.add("active");
    });
  });
})();

//================= Checkout =================//

document.addEventListener("DOMContentLoaded", function () {
  const beliSekarangButtons = document.querySelectorAll(".cart .checkout");
  const modalCheckout = document.getElementById("checkoutModal");
  const closeModalButton = modalCheckout.querySelector(".close");

  beliSekarangButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modalCheckout.classList.add("active");

      const parentBox = this.closest(".box");
      const title = parentBox.querySelector(".text h1").textContent;
      const pricePerItem = parseFloat(
        parentBox
          .querySelector(".text span")
          .textContent.replace("Rp. ", "")
          .replace(".", "")
      );

      document.getElementById("name").value = title;
      document.getElementById("price").value = formatCurrency(pricePerItem); // Initial price for 1 item

      const quantityInput = document.getElementById("quantity");
      quantityInput.value = "1";

      quantityInput.addEventListener("input", function () {
        const quantity = parseInt(quantityInput.value);
        const totalPrice = pricePerItem * quantity;
        document.getElementById("price").value = formatCurrency(totalPrice);
      });

      document.getElementById("nama").focus();
    });
  });

  closeModalButton.addEventListener("click", function () {
    modalCheckout.classList.remove("active");
  });

  const orderForm = document.getElementById("orderForm");
  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const orderData = Object.fromEntries(formData);

    showReceipt(orderData);
    sendMessageToWhatsApp(orderData);

    this.reset();
    modalCheckout.classList.remove("active");
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function showReceipt(orderData) {
    const { name, price, message, nama, phone, quantity } = orderData;
    console.log(`====== Struk Pembelian ======
Nama Barang: ${name}
Harga: ${price}
Pesan: ${message}
Nama: ${nama}
Phone: ${phone}
Quantity: ${quantity}
=======================`);
  }

  function sendMessageToWhatsApp(orderData) {
    const { name, price, message, nama, phone, quantity } = orderData;
    const messageText = `====== Struk Pembelian ======

Nama Barang: ${name}
Harga: ${price}
Pesan: ${message}
Nama: ${nama}
Phone: ${phone}
Quantity: ${quantity}

=======================`;

    const whatsappNumber = "6281398632939";
    const whatsappMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");
  }
});
