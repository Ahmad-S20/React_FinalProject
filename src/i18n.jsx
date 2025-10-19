import i18n from "i18next";
import {initReactI18next } from "react-i18next";

i18n.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Login":"login",
          "Register":"register",
          "Logout":"logout",
          "Cart":"Cart",
          "Our Brands":"Our Brands",
          "Brands":"Brands",
          "Our Categories":"Our Categories",
          "Our Products":"Our Products",
          "Categories":"Categories",
          "Products":"Products",
          "mystore":"MyStore",
          "footer1":"Welcome to MyStore, your one-stop e-commerce platform! Browse products, explore brands, and shop easily.",
          "footer2":" Built with React, MUI, and a robust API for products, categories, and brands.",
          "All Products":"All Products",
          "Search Products":"Search Products"
        }
      },
      ar:{
        translation:{
            "Home":"الصفحة الرئيسية",
            "Login":"تسجيل الدخول",
            "Register":"التسجيل",
            "Logout":"تسجيل الخروج",
            "Cart":"سلة المشتريات",
            "Our Brands":"العلامات التجارية",
            "Brands":"العلامات التجارية",
            "Our Categories":"الاقسام",
            "Categories": "الاقسام",
            "Our Products":"البضائع",
            "Products" : "البضائع",
            "mystore":"متجري",
            "footer1":"اهلا بكم بمتجرنا منصتكم الشاملة للتجارة الإلكترونية! تصفّحوا المنتجات، استكشفوا العلامات التجارية، وتسوّقوا بسهولة.",
           "footer2":"تم إنشاؤه باستخدام واجهة برمجة تطبيقات قوية للمنتجات والفئات والعلامات التجارية و React و MUI API",
           "All Products":"جميع المنتجات",
           "Search Products":"ابحث عن المنتجات"
        }
      }
    },
     lng: "en", // default language
    fallbackLng: "en",
  });