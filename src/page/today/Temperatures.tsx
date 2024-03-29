import { Main } from 'components/Home';
import { temperatureCategory } from 'constant/lookTab';
import React from 'react';

function Temperatures() {
  return <Main categories={temperatureCategory} baseUrl="temperatures" />;
}

export default Temperatures;
