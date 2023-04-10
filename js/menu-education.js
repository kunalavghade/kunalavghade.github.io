const companies = document.querySelectorAll(".collage-none");
const menuCompanies = document.querySelectorAll("#education-left ul li");

companies[0].classList.add("collage-active");
companies[0].classList.remove("collage-none");
menuCompanies[0].classList.add("education-click");

function showsCompanies(index) {
  companies.forEach((item) => {
    item.classList.add("collage-none");
  });

  companies[index].classList.add("collage-active");
  companies[index].classList.add("text-focus-in");
  menuCompanies[index].classList.add("education-click");

  if (index == 0) {
    menuCompanies[1].classList.remove("education-click");
    menuCompanies[2].classList.remove("education-click");
    companies[0].classList.remove("collage-none");
    companies[0].classList.add("collage-active");
    companies[1].classList.add("collage-none");
    companies[1].classList.remove("collage-active");
    companies[2].classList.add("collage-none");
    companies[2].classList.remove("collage-active");
  }

  if (index == 1) {
    menuCompanies[0].classList.remove("education-click");
    menuCompanies[2].classList.remove("education-click");
    companies[1].classList.remove("collage-none");
    companies[0].classList.add("collage-none");
    companies[0].classList.remove("collage-active");
    companies[2].classList.add("collage-none");
    companies[2].classList.remove("collage-active");
  }

  if (index == 2) {
    menuCompanies[0].classList.remove("education-click");
    menuCompanies[1].classList.remove("education-click");
    companies[2].classList.remove("collage-none");
    companies[0].classList.add("collage-none");
    companies[0].classList.remove("collage-active");
    companies[1].classList.add("collage-none");
    companies[1].classList.remove("collage-active");

  }

}

menuCompanies.forEach((itens, index) => {
  itens.addEventListener("click", () => {
    showsCompanies(index);
  });
});
