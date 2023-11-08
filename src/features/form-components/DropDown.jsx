import React, { useState } from 'react'

const DropDown = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.dropDownData[0].id);
	const handleDropdownChange = (event) => {
		setSelectedOption(event.target.value);
    const {name, value} = event.target;
    props.onHandleChange((prevFormData)=>({...prevFormData,[event.target[event.target.selectedIndex].id]:value}));
	};
  const optionId = props.selectOptionId
  return  (
    <div>
      <label>
        Select an option:
          <select name={optionId} value={selectedOption} label='Status' onChange={handleDropdownChange}>
            {props.dropDownData.map((data)=>(
              <option key={data.id} id={optionId} value={data.id}>
                {data.status}
              </option>))}            
          </select>
      </label>
      <p>Selected option: {selectedOption}</p>
    </div>
	);
}

export default DropDown