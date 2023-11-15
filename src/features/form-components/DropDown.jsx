import React, { useState } from 'react'

const DropDown = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.selectedOption?props.selectedOption : 0);
	const handleDropdownChange = (event) => {
		setSelectedOption(event.target.value);
    const {name, value} = event.target;    
    props.onHandleChange((prevFormData)=>({...prevFormData,[name]:value}));
	};
  const selectName = props.selectName ? props.selectName : "selectName"
  return  (
    <div>
      <label>
        Current Status:
          <select name={selectName} value={selectedOption} label='Status' onChange={handleDropdownChange}>            
            <option value='0' disabled>-- select status --</option>
            {props.dropDownData.map((data)=>(
              <option key={data.id} value={data.id}>
                {data.status}
              </option>))
            }            
          </select>
      </label>
      <p>Selected option: {selectedOption}</p>
    </div>
	);
}

export default DropDown