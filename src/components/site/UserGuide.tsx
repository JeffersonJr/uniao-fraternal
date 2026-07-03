import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function UserGuide() {
  useEffect(() => {
    // Check if the user has already seen the tour
    const hasSeenTour = localStorage.getItem("uf120-tour-completed");
    if (hasSeenTour) return;

    // Optional timeout to let the page load and animations finish
    const timer = setTimeout(() => {
      const driverObj = driver({
        showProgress: true,
        allowClose: true,
        doneBtnText: "Concluir",
        nextBtnText: "Próximo",
        prevBtnText: "Anterior",
        progressText: "{{current}} de {{total}}",
        popoverClass: "uf120-tour-theme", // We can add custom CSS class if needed
        steps: [
          {
            popover: {
              title: "Bem-vindo à União Fraternal Nº 120",
              description: "É uma honra receber sua visita em nosso ambiente digital. Preparamos um breve guia para ajudá-class a encontrar o que procura.",
            },
          },
          {
            element: "#tour-jornada",
            popover: {
              title: "Interesse na Ordem?",
              description: "Se você tem interesse genuíno em conhecer ou ingressar na Maçonaria, inicie sua jornada por aqui.",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "#tour-macom-regular",
            popover: {
              title: "Já é um Irmão?",
              description: "Maçons regulares de Lojas reconhecidas podem usar este formulário para solicitar afiliação ou planejar uma visita aos nossos trabalhos.",
              side: "top",
              align: "center",
            },
          },
          {
            popover: {
              title: "Fique à vontade!",
              description: "Sinta-se em casa para explorar nossa história, valores e artigos. Se precisar de algo, não hesite em usar o nosso botão do WhatsApp no canto inferior direito.",
            },
          },
        ],
        onDestroyStarted: () => {
          if (!driverObj.hasNextStep() || confirm("Deseja pular o guia?")) {
            localStorage.setItem("uf120-tour-completed", "true");
            driverObj.destroy();
          }
        },
      });

      driverObj.drive();
    }, 1500); // 1.5s delay to not conflict with initial hero animations

    return () => clearTimeout(timer);
  }, []);

  return null;
}
