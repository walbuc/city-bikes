/** @jsxImportSource theme-ui */
import {useBikes} from '../utils/hooks'

// import {BookListUL} from './lib'
// import {BookRow} from './book-row'
// import {Profiler} from './profiler'

// function ListItemList({filterListItems, noListItems, noFilteredListItems}) {

//     <Profiler
//       id="List Item List"
//       metadata={{listItemCount: filteredListItems.length}}
//     >
//       <BookListUL>
//         {filteredListItems.map(listItem => (
//           <li key={listItem.id} aria-label={listItem.book.title}>
//             <BookRow book={listItem.book} />
//           </li>
//         ))}
//       </BookListUL>
//     </Profiler>
//   )
// }

//export {ListItemList}

BikesList.propTypes = {}

function BikesList(props) {
  const bikes = useBikes()

  return <div>{JSON.stringify(bikes, 0, 2)}</div>
}

export default BikesList
