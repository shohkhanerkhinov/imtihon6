import React, { useState, useEffect } from 'react';
import URLimg from './assets/test.svg';

import './App.css';
import './index.css';

function App() {
  const [urlimg, setUrl] = useState('');
  const [conpanie, setConpanie] = useState('');
  const [lavozim, setLavozim] = useState('');
  const [newChecked, setNewChecked] = useState(false);
  const [featuredchecked, setFeaturedchecked] = useState(false);
  const [sel1, setSel1] = useState('');
  const [sel2, setSel2] = useState('');
  const [sel3, setSel3] = useState('');
  const [card, setCard] = useState([]);
  const [skills, setSkills] = useState({
    fullstack: false,
    python: false,
    midweight: false,
    react: false,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCard(savedCards);
  }, []);

  useEffect(() => {
    if (card.length > 0) {
      localStorage.setItem('cards', JSON.stringify(card));
    }
  }, [card]);

  function handleSave(event) {
    event.preventDefault();
    const cardd = {
      urlimg,
      conpanie,
      lavozim,
      skills,
      sel1,
      sel2,
      sel3,
      newChecked,
      featuredchecked,
      id: Date.now(),
    };

    let copie = [...card];
    if (editId) {
      copie = copie.map(c => c.id == editId ? cardd : c);
    } else {
      copie.push(cardd);
    }
    setCard(copie);
    setUrl('');
    setConpanie('');
    setLavozim('');
    setSkills({ fullstack: false, python: false, midweight: false, react: false });
    setSel1('');
    setSel2('');
    setSel3('');
    setNewChecked(false);
    setFeaturedchecked(false);
    setEditId(null);
  }

  function handleDelete(id) {
    const filteredCards = card.filter(c => c.id !== id);
    setCard(filteredCards);
  }

  function handleEdit(cardData) {
    setEditId(cardData.id);
    setUrl(cardData.urlimg);
    setConpanie(cardData.conpanie);
    setLavozim(cardData.lavozim);
    setSkills(cardData.skills);
    setSel1(cardData.sel1);
    setSel2(cardData.sel2);
    setSel3(cardData.sel3);
    setNewChecked(cardData.newChecked);
    setFeaturedchecked(cardData.featuredchecked);
  }

  return (
    <div className='container'>
      <header>
        <button className='darkMod'>DARKMOD</button>
      </header>
      <div className="content">
        <div className="form">
          <form>
            <h2>Vakansiya ma'lumotlarini kiriting</h2>
            <label>Logotip URL</label><br />
            <input
              value={urlimg}
              onChange={(e) => setUrl(e.target.value)}
              className='input'
              type="url"
              placeholder='Logotip URL manzilini kiriting'
            /><br />

            <label>Konpaniya nomi</label><br />
            <input
              value={conpanie}
              onChange={(e) => setConpanie(e.target.value)}
              className='input'
              type="text"
              placeholder='Manage'
            />

            <div className='chakked'>
              <label>NEW</label>
              <input
                type="checkbox" checked={newChecked}
                onChange={() => setNewChecked(!newChecked)}
              />
              <label>FEATURED</label>
              <input type="checkbox"
                checked={featuredchecked}
                onChange={() => setFeaturedchecked(!featuredchecked)}
              />
            </div>

            <label>Lavozimi</label>
            <input
              value={lavozim}
              onChange={(e) => setLavozim(e.target.value)} className='input'
              type="text"
              placeholder='Fullstack Developer'
            />

            <div className="selects">
              <select onChange={(e) => setSel1(e.target.value)}>
                <option value="1d ago">1d ago</option>
                <option value="2d ago">2d ago</option>
                <option value="3d ago">3d ago</option>
                <option value="4d ago">4d ago</option>
                <option value="5d ago">5d ago</option>
              </select>

              <select onChange={(e) => setSel2(e.target.value)}>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>

              <select onChange={(e) => setSel3(e.target.value)}>
                <option value="Worldwide">Worldwide</option>
                <option value="USA only">USA only</option>
                <option value="UK only">UK only</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="chak">
              <h4>Ko'nikmalar</h4>

              <div className="right">
                <label>Fullstack</label>
                <input
                  type="checkbox"
                  checked={skills.fullstack}
                  onChange={() => setSkills({ ...skills, fullstack: !skills.fullstack })}
                />

                <label>Python</label>
                <input
                  type="checkbox"
                  checked={skills.python}
                  onChange={() => setSkills({ ...skills, python: !skills.python })}
                />
              </div>

              <div className="left">
                <label>Midweight</label>
                <input
                  type="checkbox"
                  checked={skills.midweight}
                  onChange={() => setSkills({ ...skills, midweight: !skills.midweight })}
                />

                <label>React</label>
                <input
                  type="checkbox"
                  checked={skills.react}
                  onChange={() => setSkills({ ...skills, react: !skills.react })}
                />
              </div>
            </div>

            <button className='seve' onClick={handleSave}>
              {editId ? 'Yangilash' : 'Saqlash'}
            </button>
          </form>
        </div>
      </div>

      <div className="cards">
        {
          card.length > 0 && card.map(function (cardw, index) {
            return (
              <div className="card" key={index}>
                <div className="cardRight">
                  <img className='URLimg' src={cardw.urlimg || URLimg} alt="Logo" />
                  <div className="title">
                    <div className="Pages">
                      <h3>{cardw.conpanie}</h3>
                      {cardw.newChecked && <p>NEW!</p>}
                      {cardw.featuredchecked && <p className='t'>FEATURED</p>}
                    </div>
                    <h2>{cardw.lavozim}</h2>
                    <ul>
                      <li>{cardw.sel1}</li>
                      <li>. {cardw.sel2} .</li>
                      <li>{cardw.sel3}</li>
                    </ul>
                  </div>
                </div>
                <div className="cardLeft">
                  <ul className='buttons'>
                    {cardw.skills.fullstack && <li>Fullstack</li>}
                    {cardw.skills.python && <li>Python</li>}
                    {cardw.skills.midweight && <li>Midweight</li>}
                    {cardw.skills.react && <li>React</li>}
                  </ul>
                  <button className='delete' onClick={() => handleDelete(cardw.id)}>
                    O'chirish
                  </button>
                  <button className='edit' onClick={() => handleEdit(cardw)}>
                    Taxrirlash
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
