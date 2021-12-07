/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { clearAnimals, deleteItem } from '../counter/animalSlice';
import '../App.scss';

import Amimal from '../components/AnimalForm/AnimalForm';
import Translations from './Translations';

const Home = () => {
  const dispatch = useAppDispatch();
  const animals = useAppSelector((state) => state.animals);

  const [modal, setModal] = useState(false);
  const [activeButton, setActiveButton] = useState<string>('All');
  const animalSpecies = animals.map((item) => item.specie);
  const speciesButtons = [...new Set(animalSpecies)];

  useEffect(() => {
    localStorage.setItem('Animals', JSON.stringify(animals));
  }, [animals]);

  return (
    <div className="container">
      <div className="logo">
        <Link className="nav__link" to="/">
          <img src="/logo.jpg" alt="logo" />
        </Link>
      </div>
      <div className="lang">
        <select className="lang__select">
          <option value="en">EN</option>
        </select>
        <button
          className="button button--add-lang"
          style={{ padding: '0px 7px' }}
        >
          <Link className="nav__link" to="/translations">
            +
          </Link>
        </button>
      </div>
      <div className="main__buttons">
        <button className="button button--add" onClick={() => setModal(true)}>
          Add animal
        </button>
        <button
          className="button button--clear"
          onClick={() => dispatch(clearAnimals())}
        >
          Clear all
        </button>
      </div>

      <div className={modal ? 'modal' : 'modal hidden'}>
        <Amimal clickHandler={setModal} />
      </div>

      <div className="content">
        {animals.length ? (
          <div>
            <div className="buttons__wrapper">
              <button
                className="button button--all"
                onClick={() => setActiveButton('All')}
              >
                All
              </button>
              {speciesButtons.map((name) => (
                <button
                  className="button button--species"
                  key={name}
                  onClick={() => setActiveButton(name)}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="content content--title">No animals added yet</h1>
        )}
      </div>
      <div className="animal__content">
        {animals
          .filter((item) => (activeButton === 'All' ? item : item.specie === activeButton))
          .map((item, index) => (
            <div className="animal__item" key={index}>
              <button
                className="button button--delete"
                onClick={() => dispatch(deleteItem(item.id))}
              >
                x
              </button>
              <div className="image__wrapper">
                <img
                  className="animal__item--image"
                  src={item.imgSrc}
                  width="250"
                  alt="animal"
                />
              </div>

              <span className="animal__item--name">{`Animal: ${item.name.en}`}</span>
              <span className="animal__item--species">{`Species: ${item.specie}`}</span>
            </div>
          ))}
      </div>
      <Routes>
        <Route path="/translations" element={<Translations />} />
      </Routes>
    </div>
  );
};
export default Home;
