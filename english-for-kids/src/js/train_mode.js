const pageElement = {
  flip: 'card-flipper',
  rotateFlip: 'card-flipper_rotated',
};

const rotateCard = (e) => {
  const flip = e.target.parentElement.parentElement.parentElement;
  flip.classList.add(pageElement.rotateFlip);
  flip.parentElement.addEventListener('mouseleave', () => flip.classList.remove(pageElement.rotateFlip), { once: true });
};

export default rotateCard;
