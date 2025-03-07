// import { Pipe, PipeTransform } from '@angular/core';
// import { Character } from '../models/character';

// @Pipe({
//   name: 'filter',
//   standalone: true
// })
// export class FilterPipe implements PipeTransform {
//   transform(characters: Character[], searchName: string, searchStatus: string): Character[] {
//     if (!characters) return [];
    
//     return characters.filter(character => {
//       const nameMatch = !searchName || character.name.toLowerCase().includes(searchName.toLowerCase());
//       const statusMatch = !searchStatus || character.status.toLowerCase() === searchStatus.toLowerCase();
//       return nameMatch && statusMatch;
//     });
//   }
// }