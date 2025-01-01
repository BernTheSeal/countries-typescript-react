import { advancedSearchInputPropsType } from "../../../../types/advancedSearchInputPropsType";

const ToggleFilters = ({
  advancedSearchOptions,
  handleUpdateAdvancedSearch,
}: advancedSearchInputPropsType) => {
  const seaAccess = advancedSearchOptions?.seaAccess;
  const independent = advancedSearchOptions?.independent;
  const unitedNations = advancedSearchOptions?.unitedNations;

  return (
    <div className="AdvancedSearch-container-content-toggleFilters">
      <div>
        <label
          className={
            seaAccess === true
              ? "active"
              : seaAccess === false
              ? "inactive"
              : "undefined"
          }
        >
          <input
            type="checkbox"
            checked={seaAccess}
            onChange={() => handleUpdateAdvancedSearch(seaAccess, "seaAccess")}
          />
          Sea Access
        </label>
        <label
          className={
            unitedNations === true
              ? "active"
              : unitedNations === false
              ? "inactive"
              : "undefined"
          }
        >
          <input
            type="checkbox"
            checked={unitedNations}
            onChange={() =>
              handleUpdateAdvancedSearch(unitedNations, "unitedNations")
            }
          />
          United Nations
        </label>
      </div>
      <div>
        <label
          className={
            independent === true
              ? "active"
              : independent === false
              ? "inactive"
              : "undefined"
          }
        >
          <input
            type="checkbox"
            checked={independent}
            onChange={() =>
              handleUpdateAdvancedSearch(independent, "independent")
            }
          />
          Independent
        </label>
      </div>
    </div>
  );
};

export default ToggleFilters;
