import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  highlightedWord?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, highlightedWord }) => {
  const renderTitle = () => {
    if (highlightedWord) {
      const parts = title.split(highlightedWord);
      return (
        <>
          {parts[0]}
          <span className="gradient-text">{highlightedWord}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <div className="section-header">
      <h2 className="section-title">{renderTitle()}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
