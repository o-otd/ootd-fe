import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BookMarkSvg } from '../../styles/images/icons/bookmark.svg';
import { ReactComponent as LikesSvg } from '../../styles/images/icons/likes.svg';
import { ReactComponent as FollowSvg } from '../../styles/images/icons/follow.svg';
import { ITodayCardProps } from 'types/Home';

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
`;

const CardHeaderUser = styled.div`
  display: flex;
  align-items: center;
`;

const CardHeaderProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  background-color: ${({ theme }) => theme.colors.gray9};
`;

const CardHeaderInfo = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;

  & strong {
    font-size: 17px;
    font-weight: 600;
  }

  & span {
    font-size: 13px;
    font-weight: 500;
    margin-top: 2px;
  }
`;

const CardHeaderUtil = styled.ul`
  display: flex;

  & li + li {
    margin-left: 8px;
  }
`;

const CardItems = styled.ul`
  margin: 24px 0 0 16px;
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  & li + li {
    margin-left: 12px;
  }

  & li {
    & span {
      font-size: 12px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray7};
    }

    & div {
      margin-top: 5px;
      width: 72px;
      height: 72px;
      background-color: ${({ theme }) => theme.colors.gray5};
      border-radius: ${({ theme }) => theme.borderRadius.borderRadius20};
    }
  }
`;

const UtilIconLikes = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    & path {
      fill: ${({ theme }) => theme.colors.tint1};
    }
  }
`;

const UtilIconBookMark = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    & path {
      fill: ${({ theme }) => theme.colors.main};
    }
  }
`;

const UtilIconFollow = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    & path {
      fill: ${({ theme }) => theme.colors.main};
    }
  }
`;

function TodayCard({ setIsOpen }: ITodayCardProps) {
  const onClickOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <CardHeader>
        <CardHeaderUser>
          <CardHeaderProfile></CardHeaderProfile>
          <CardHeaderInfo>
            <strong>Anonymous</strong>
            <span>11월 3일 옷장</span>
          </CardHeaderInfo>
        </CardHeaderUser>
        <CardHeaderUtil>
          <li>
            <UtilIconLikes>
              <LikesSvg />
            </UtilIconLikes>
          </li>
          <li>
            <UtilIconBookMark>
              <BookMarkSvg />
            </UtilIconBookMark>
          </li>
          <li>
            <UtilIconFollow>
              <FollowSvg />
            </UtilIconFollow>
          </li>
        </CardHeaderUtil>
      </CardHeader>
      <CardItems>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <li key={index}>
            <button type="button" onClick={onClickOpenModal}>
              <span>outer</span>
              <div></div>
            </button>
          </li>
        ))}
      </CardItems>
    </div>
  );
}

export default TodayCard;