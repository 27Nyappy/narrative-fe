import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Character from './Character';
import { getCurrentStoryId } from '../../selectors/storySelectors';
import { fetchCharactersByStoryId } from '../../actions/characterActions';
import { getCurrentStoryCharacters } from '../../selectors/characterSelectors';

const CharacterList = () => {
  const storyId = useSelector(state => getCurrentStoryId(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCharactersByStoryId(storyId));
  }, []);

  const characters = useSelector(state => getCurrentStoryCharacters(state));

  let storyCharacters;
  if(characters.length > 0) {
    storyCharacters = characters.map((character, i) => {
      return (
        <li key={character._id || i}>
          <Character characterId={character._id} currentName={character.characterName} currentDescription={character.characterDescription} />
        </li>
      );
    });
  }

  return (
    <div>
      <h2>Characters</h2>
      <ul>
        {storyCharacters}
      </ul>
    </div>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object)
};

export default CharacterList;