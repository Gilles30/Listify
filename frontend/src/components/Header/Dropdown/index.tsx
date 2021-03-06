import React, { useState, useEffect, useCallback } from 'react';
import { FiLogOut, FiMaximize, FiGithub } from 'react-icons/fi';

import { toggleFullScreen } from '../../../utils/toggleFullScreen';

import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

interface IDropdownProps {
  showDropdown: boolean;
  setShowDropdown: (state: boolean) => void;
}

const Dropdown: React.FC<IDropdownProps> = ({
  showDropdown,
  setShowDropdown,
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { signOut } = useAuth();

  const handleFullScreen = useCallback(() => {
    setFullScreen(!fullScreen);
  }, [fullScreen]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreen);

    setShowDropdown(false);
  }, [handleFullScreen, setShowDropdown]);

  useEffect(() => {
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreen);

      setShowDropdown(false);
    };
  }, [handleFullScreen, setShowDropdown]);

  return (
    <Container showDropdown={showDropdown}>
      <ul>
        <li>
          <button type="button" onClick={() => toggleFullScreen(fullScreen)}>
            <FiMaximize />
            {fullScreen ? 'Sair da tela cheia' : 'Tela cheia'}
          </button>
        </li>
        <li>
          <a
            href="https://github.com/Gilles30/Listify"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub />
            Contribue
          </a>
        </li>
        <li>
          <button type="button" onClick={signOut}>
            <FiLogOut />
            Sair
          </button>
        </li>
      </ul>
    </Container>
  );
};

export default Dropdown;
