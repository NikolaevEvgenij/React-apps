import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [
            { name: 'John C.', salary: 800, increase: false, rise: true, id: 1 },
            { name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2 },
            { name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3 }
         ],
         term: '',
         filter: 'onAll'
      }
      this.maxId = 4;
   }


   deleteItem = (id) => {
      this.setState(({ data }) => {
         return {
            data: data.filter(item => item.id !== id)
         }
      })
   }

   // Да, пока могут добавляться пустые пользователи. Мы это еще исправим
   addItem = (name, salary) => {

      const newItem = {
         name,
         salary,
         increase: false,
         rise: false,
         id: this.maxId++
      }
      this.setState(({ data }) => {
         const newArr = [...data, newItem];
         return {
            data: newArr
         }
      });

   }

   onToggleProp = (id, prop) => {
      console.log(`Increase this ${id}`)
      // this.setState(({ data }) => {
      //    const index = data.findIndex((elem) => elem.id === id)

      //    const old = data[index];
      //    const newItem = { ...old };
      //    newItem.increase = !old.increase
      //    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
      //    return {
      //       data: newArr
      //    }
      // })
      this.setState(({ data }) => ({
         data: data.map(item => {
            if (item.id === id) {
               return { ...item, [prop]: !item[prop] }
            }
            return item
         })
      }));
   }

   searchEmp = (items, term) => {
      if (items.length === 0) {
         return items;
      }

      return items.filter(item => {
         return item.name.includes(term)
      })
   }

   onUpdateSearch = (term) => {
      this.setState({ term });
   }

   filterPost = (items, filter) => {
      switch (filter) {
         case 'onRise': return items.filter(item => item.rise)
         case 'moreThen1000': return items.filter(item => item.salary > 1000)
         default: return items
      }
   }

   onUpdateFilter = (filter) => {
      this.setState({ filter });
   }
   onUpdateSalary = (id, salary) => {
      console.log(`Change this ${id}`, salary, +salary.slice(0, -1))
      this.setState(({ data }) => ({
         data: data.map((item) => {
            if (item.id === id) {
               return { ...item, salary: +salary.slice(0, -1) }
            }
            return item
         })
      }));
   }


   render() {
      const { data, term, filter } = this.state;
      const employees = this.state.data.length;
      const increased = this.state.data.filter(item => item.increase).length;
      const visibleData = this.filterPost(this.searchEmp(data, term), filter);

      // const visibleData = this.onRise(data);
      return (
         <div className="app">
            <AppInfo
               employees={employees}
               increased={increased} />

            <div className="search-panel">
               <SearchPanel
                  onUpdateSearch={this.onUpdateSearch} />
               <AppFilter
                  filter={filter}
                  onUpdateFilter={this.onUpdateFilter} />
            </div>

            <EmployeesList
               data={visibleData}
               onDelete={this.deleteItem}
               onToggleProp={this.onToggleProp}
               onUpdateSalary={this.onUpdateSalary} />
            <EmployeesAddForm onAdd={this.addItem} />
         </div>
      );
   }
}

export default App;