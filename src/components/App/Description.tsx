import React from 'react';
import ReactHtmlParser from 'react-html-parser';

interface DescriptionProps {
  description: string;
}

const Description = (props: DescriptionProps) => {
  return <p className="text-justify mb-5 text-light">{ReactHtmlParser(props.description)}</p>;
};

export default Description;
