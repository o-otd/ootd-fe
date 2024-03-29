import { RANGE_GAP } from 'constant/bottomFilters';
import usePercentage from 'hooks/usePercentage';
import useSetCurrentFilters from 'hooks/useSetCurrentFilters';
import useSyncFilters from 'hooks/useSyncFilters';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IRangeFilterProps } from 'types/Common';

function RangeFilter({ filterType, filterIndex }: IRangeFilterProps) {
  useSyncFilters(filterIndex);

  const { currentFilter, filter, setCurrentRangeFilterValues } =
    useSetCurrentFilters();

  const [leftValue, setLeftValue] = useState<number>(
    filterType === 'height' ? 148 : 38,
  );
  const [rightValue, setRightValue] = useState<number>(
    filterType === 'height' ? 190 : 100,
  );

  const updateLeftValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value;
    const inputRightValue = currentFilter[filterIndex][1]
      ? currentFilter[filterIndex][1]
      : rightValue;

    value =
      inputRightValue - value < RANGE_GAP ? inputRightValue - RANGE_GAP : value;

    setCurrentRangeFilterValues(filterIndex, value, inputRightValue);
    setLeftValue(value);
  };

  const updateRightValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value;
    const inputLeftValue = currentFilter[filterIndex][0]
      ? currentFilter[filterIndex][0]
      : leftValue;

    value =
      value - inputLeftValue < RANGE_GAP ? inputLeftValue + RANGE_GAP : value;

    setCurrentRangeFilterValues(filterIndex, inputLeftValue, value);
    setRightValue(value);
  };

  const [leftPercentage, rightPercentage] = usePercentage(
    currentFilter[filterIndex][0] ? currentFilter[filterIndex][0] : leftValue,
    currentFilter[filterIndex][1] ? currentFilter[filterIndex][1] : rightValue,
    filterType === 'height' ? 148 : 38,
    filterType === 'height' ? 190 : 100,
  );

  useEffect(() => {
    setLeftValue(filterType === 'height' ? 148 : 38);
    setRightValue(filterType === 'height' ? 190 : 100);
  }, [filterType]);

  useEffect(() => {
    if (!filter[filterIndex][0] && !filter[filterIndex][1]) {
      setLeftValue(filterType === 'height' ? 148 : 38);
      setRightValue(filterType === 'height' ? 190 : 100);
    }
  }, [filter[filterIndex]]);

  return (
    <>
      <RangeInfo>
        <RangeText>{`${
          currentFilter[filterIndex][0]
            ? currentFilter[filterIndex][0]
            : leftValue
        }${filterType === 'height' ? 'cm' : 'kg'} ~ ${
          currentFilter[filterIndex][1]
            ? currentFilter[filterIndex][1]
            : rightValue
        }${filterType === 'height' ? 'cm' : 'kg'}`}</RangeText>
        <RangeInput>
          <input
            type="range"
            id="input-left"
            min={filterType === 'height' ? 148 : 38}
            max={filterType === 'height' ? 190 : 100}
            value={
              currentFilter[filterIndex][0]
                ? currentFilter[filterIndex][0]
                : leftValue
            }
            onChange={updateLeftValue}
          />
          <input
            type="range"
            id="input-right"
            min={filterType === 'height' ? 148 : 38}
            max={filterType === 'height' ? 190 : 100}
            value={
              currentFilter[filterIndex][1]
                ? currentFilter[filterIndex][1]
                : rightValue
            }
            onChange={updateRightValue}
          />
          <RangeControls>
            <RangeControlsCalc
              $left={leftPercentage}
              $right={100 - rightPercentage}
            ></RangeControlsCalc>
            <RangeControlsLeft $left={leftPercentage}></RangeControlsLeft>
            <RangeControlsRight
              $right={100 - rightPercentage}
            ></RangeControlsRight>
          </RangeControls>
        </RangeInput>
      </RangeInfo>
    </>
  );
}

export default RangeFilter;

const RangeInfo = styled.div`
  position: relative;
  padding: 0 34px;
`;

const RangeText = styled.div`
  margin-top: 16px;
  font-size: 25px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray9};
`;

const RangeInput = styled.div`
  margin-top: 15px;
  position: relative;
  pointer-events: none;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};

  & input {
    appearance: none;
    -webkit-appearance: none;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 10px;
    opacity: 0;

    &:first-child {
      top: 1rem;
    }

    &::-webkit-slider-thumb {
      pointer-events: all;
      appearance: none;
      -webkit-appearance: none;
      width: 36px;
      height: 36px;
    }
  }
`;

const RangeControls = styled.div`
  position: relative;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
  top: 50%;
  transform: translateY(-50%);
`;

const RangeControlsCalc = styled.div<{ $left: number; $right: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $left }) => `${$left}%`};
  right: ${({ $right }) => `${$right}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
`;

const RangeControlsLeft = styled.div<{ $left: any }>`
  position: absolute;
  top: 50%;
  width: 36px;
  height: 36px;
  background-color: rgba(96, 96, 96, 0.79);
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
  transform: translateY(-50%);
  left: ${({ $left }) => `${$left}%`};
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const RangeControlsRight = styled.div<{ $right: any }>`
  position: absolute;
  top: 50%;
  width: 36px;
  height: 36px;
  background-color: rgba(96, 96, 96, 0.79);
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
  transform: translateY(-50%);
  right: 0;

  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.borderRadius50};
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  right: ${({ $right }) => `${$right}%`};
`;
