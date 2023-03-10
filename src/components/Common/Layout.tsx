import React from 'react';
import searchSvg from '../../styles/images/icons/search.svg';
import noticeSvg from '../../styles/images/icons/notice.svg';
import styled from 'styled-components';
import { ILayoutProps } from 'types/Common';

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.gray3};
  height: 95px;
  border-radius: ${({ theme }) => theme.borderRadius.borderRadius30};
`;

const InnerContainer = styled.div`
  width: ${({ theme }) => theme.innerContainer.width};
  padding: ${({ theme }) => theme.innerContainer.padding};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 51px;
`;

const HeaderLogo = styled.h1`
  font-size: 16px;
  font-weight: 700;
`;

const HeaderUtil = styled.ul`
  display: flex;

  & li {
    width: 24px;
    height: 24px;
  }

  & li + li {
    margin-left: 20px;
  }

  & li * {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const HeaderNav = styled.nav`
  font-weight: 600;
`;
const HeaderNavLists = styled.ul`
  display: flex;
  justify-content: space-between;
`;
const HeaderNavList = styled.li`
  color: ${({ theme }) => theme.colors.gray7};
`;

function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Header>
        <InnerContainer>
          <HeaderTop>
            <HeaderLogo>LOGO</HeaderLogo>
            <HeaderUtil>
              <li>
                <button type="button">
                  <img src={searchSvg} alt="검색" />
                </button>
              </li>
              <li>
                <button type="button">
                  <img src={noticeSvg} alt="알림" />
                </button>
              </li>
            </HeaderUtil>
          </HeaderTop>

          <HeaderNav>
            <HeaderNavLists>
              <HeaderNavList>오늘의 옷장</HeaderNavList>
              <HeaderNavList>일주일 옷장</HeaderNavList>
              <HeaderNavList>컨펌</HeaderNavList>
              <HeaderNavList>MY</HeaderNavList>
            </HeaderNavLists>
          </HeaderNav>
        </InnerContainer>
      </Header>

      {children}
    </>
  );
}

export default Layout;
