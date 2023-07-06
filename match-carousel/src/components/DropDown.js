import './DropDown.css';

/**
 * Each option must have an "_id" and "name" field
 */
const DropDown = ({ label, options, callback }) => {
    const optionItems = options.map((option, index) => {
        return (
            <option key={option._id} value={index}>{ option.name }</option>
        );
    });

    return(
        <div className="flex flex-col">
            <small>{ label }</small>
            <select onChange={callback}>
                { optionItems }
            </select>
        </div>
    );
};

export default DropDown;