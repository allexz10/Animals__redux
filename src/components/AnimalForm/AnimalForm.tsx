/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addNewAnimal } from '../../counter/animalSlice';

type Props = {
  clickHandler: (arg: boolean) => void;
};

const Animal: React.FC<Props> = ({ clickHandler }) => {
  const [inputName, setInputName] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [inputSpecies, setInputSpecies] = useState('');
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [id, setId] = useState(0);
  const animals = useAppSelector((state) => state.animals);
  const dispatch = useAppDispatch();

  const animalSpecies = animals.map((item) => item.specie);
  const uniqueSpecies = [...new Set(animalSpecies)];

  const clearAllinputs = () => {
    setInputName('');
    setInputImage('');
    setInputSpecies('');
  };
  const closeModal = () => {
    clickHandler(false);
    setErrorMsg(false);
    setFormValid(false);
  };

  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      inputName.length > 2
      && (inputImage.includes('data:image') || inputImage.includes('https'))
      && inputSpecies !== 'select one'
      && inputSpecies !== ''
    ) {
      closeModal();
      setId(id + 1);
      clearAllinputs();
      dispatch(
        addNewAnimal({
          name: { en: inputName.charAt(0).toUpperCase() + inputName.slice(1) },
          imgSrc: inputImage,
          specie: inputSpecies,
          id,
        }),
      );
    } else {
      setErrorMsg(true);
      setFormValid(true);
    }
  };

  useEffect(() => {
    setDropDownVisible(!!animals.length);
  }, [animals]);

  return (
    <form className="form" onSubmit={submit}>
      <div className="form__content">
        <h3 className="form__title">Add new animal</h3>
        <button
          type="button"
          className="button button--close"
          onClick={() => {
            closeModal();
            clearAllinputs();
          }}
        >
          X
        </button>
        <label className="label label--name" htmlFor="name">
          Name
        </label>

        <input
          className={
            inputName.length > 2 ? 'input input--name' : 'input invalid'
          }
          id="name"
          type="text"
          onChange={(e) => setInputName(e.target.value)}
          value={inputName}
        />

        <label className="label label--image" htmlFor="image">
          Image source
        </label>
        <input
          className={
            inputImage.includes('data:image') || inputImage.includes('https')
              ? 'input input--image'
              : 'input invalid'
          }
          id="image"
          type="text"
          onChange={(e) => setInputImage(e.target.value)}
          value={inputImage}
        />

        <div className="species_wrapper">
          <div
            className="label label--specie"
            onClick={() => {
              setDropDownVisible(!dropDownVisible);
              setInputSpecies('');
            }}
          >
            {`${!dropDownVisible ? 'Species (view options list)' : 'Species (add new species)'} `}
          </div>
          {!dropDownVisible ? (
            <label className="label label--specie" htmlFor="specie">
              <input
                className={
                  inputSpecies.length > 2
                    ? 'input input--name'
                    : 'input invalid'
                }
                id="specie"
                type="text"
                onChange={(e) => setInputSpecies(e.target.value)}
                value={inputSpecies}
              />
            </label>
          ) : (
            <div className="label label--specie">
              <select
                className={
                  inputSpecies !== 'select one' && inputSpecies !== ''
                    ? 'input input--select'
                    : 'input invalid'
                }
                value={inputSpecies}
                onChange={(e) => setInputSpecies(e.target.value)}
              >
                <option className="option option--select" value="select one">
                  --select one--
                </option>
                {uniqueSpecies.map((specie) => (
                  <option
                    className="option option--specie"
                    key={Math.random()}
                    value={specie}
                  >
                    {specie}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <span className="error__message">
          {errorMsg ? 'Please fill in all fields!' : ''}
        </span>
        <button
          className="button button--submit"
          onClick={() => {
            if (formValid) {
              setErrorMsg(false);
            } else {
              setErrorMsg(true);
            }
          }}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Animal;
