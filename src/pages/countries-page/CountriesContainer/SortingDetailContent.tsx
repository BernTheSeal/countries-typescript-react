interface SortingDetailContentProps {
  sortingDetailContentList: string[];
}

const SortingDetailContent = (props: SortingDetailContentProps) => {
  const { sortingDetailContentList } = props;
  return (
    <div className="countryCard-expandContent">
      <div className="countryCard-expandContent-gap"></div>
      <div className="countryCard-expandContent-container">
        {sortingDetailContentList.map((item, index) => (
          <span key={index}>
            {index + 1}-{item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SortingDetailContent;
