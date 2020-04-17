/* eslint-disable import/prefer-default-export */
const pageElement = {
  flip: 'card-flipper',
  rotateFlip: 'card-flipper_rotated',
};

export const rotateCard = (e) => {
  const flip = e.path.find((item) => item.classList.contains(pageElement.flip));
  flip.classList.add(pageElement.rotateFlip);
  flip.parentElement.addEventListener('mouseleave', () => flip.classList.remove(pageElement.rotateFlip), { once: true });
};
