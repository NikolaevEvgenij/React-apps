
import "./app-filter.css";

const AppFilter = (props) => {
   const buttonsData = [
      { name: 'onAll', label: 'Все сотрудники' },
      { name: 'onRise', label: 'На повышение' },
      { name: 'moreThen1000', label: 'З/П больше 1000$' }
   ];

   const buttons = buttonsData.map(({ name, label }) => {
      const active = props.filter === name;
      const clazz = active ? 'btn-light' : 'btn-outline-light';
      return (
         <button type="button"
            className={`btn ${clazz}`}
            key={name}
            onClick={() => props.onUpdateFilter(name)}>
            {label}
         </button>
      )
   })

   return (
      <div className="btn-group">
         {buttons}
      </div>
   )
}

export default AppFilter;