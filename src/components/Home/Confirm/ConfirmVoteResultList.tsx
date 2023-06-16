import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ConfirmCheckSVG } from '@svg/check.svg';
import { IConfirmVoteResultList } from 'types/Home/Confirm';

function ConfirmVoteResultList({
  pickValue,
  isSubmit,
  isShowResult,
}: IConfirmVoteResultList) {
  return (
    <>
      <ConfirmVoteResultItem $isActive={pickValue === '0'} $isSelected={false}>
        {(!isShowResult || isSubmit) && <ConfirmCheckSVG />}
        입고 나가요
        <ConfirmVoteListResult>
          12%
          <span>1234표</span>
        </ConfirmVoteListResult>
      </ConfirmVoteResultItem>
      <ConfirmVoteResultItem $isActive={pickValue === '1'} $isSelected={true}>
        {(!isShowResult || isSubmit) && <ConfirmCheckSVG />}
        다시 골라요
        <ConfirmVoteListResult>
          88%
          <span>1234표</span>
        </ConfirmVoteListResult>
      </ConfirmVoteResultItem>
    </>
  );
}

export default ConfirmVoteResultList;

const ConfirmVoteListResult = styled.div`
  position: absolute;
  right: 16px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray8};

  & span {
    margin-left: 10px;
  }
`;

const ConfirmVoteResultItem = styled.div<{
  $isSelected: boolean;
  $isActive: boolean;
}>`
  position: relative;
  overflow: hidden;
  margin-top: 12px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.colors.gray8};
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius10};
  z-index: 3;

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    left: 0;
    z-index: -1;
    width: ${({ $isSelected }) => ($isSelected ? '88%' : '12%')};
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? ' #87B207' : theme.colors.gray5};
  }

  & svg {
    & path {
      fill: ${({ $isActive, theme }) => ($isActive ? theme.colors.gray8 : '')};
    }
    display: ${({ $isActive }) => ($isActive ? '' : 'none')};
    width: ${({ $isActive }) => ($isActive ? '20px' : '')};
    height: ${({ $isActive }) => ($isActive ? '20px' : '')};
    margin-right: ${({ $isActive }) => ($isActive ? '10px' : '')};
  }
`;