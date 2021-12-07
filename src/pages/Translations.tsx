/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hook';
import '../App.scss';

const Translations = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [langValue, setLangValue] = useState('');

  const animals = useAppSelector((state) => state.animals);

  return (
    <div className="container">
      <div className="logo">
        <Link className="nav__link" to="/">
          <img src="/logo.jpg" alt="logo" />
        </Link>
      </div>
      <h1>Translations</h1>
      <div className="content">
        <div className="lang__wrapper">
          <label htmlFor="lang">
            Add new language
            <input type="text" id="lang" onChange={(e) => setLangValue(e.target.value)} value={langValue} />
          </label>

          <button onClick={() => {
            setLanguages([...languages, langValue]);
            setLangValue('');
          }}
          >
            add

          </button>
          <div className="table">
            <div className="item__wrapper" />
            {animals.map((item, index) => (
              <div className="item" key={Math.random()}>
                <p>
                  {item.name.en}
                </p>
                <div className="translation">
                  {languages.map((lang) => (
                    <div key={Math.random()}>
                      <p>{lang}</p>
                      <input className="input" type="text" key={index} />
                      <button>edit</button>
                      <button>save</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

  );
};

export default Translations;
