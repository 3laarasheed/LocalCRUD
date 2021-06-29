import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'student-list',
    pathMatch: 'full'
  },
  {
    path: 'student-create',
    loadChildren: () => import('./pages/student-create/student-create.module').then(m => m.StudentCreatePageModule)
  },
  {
    path: 'student-list',
    loadChildren: () => import('./pages/student-list/student-list.module').then(m => m.StudentListPageModule)
  },
  {
    path: 'student-edit/:id',
    loadChildren: () => import('./pages/student-edit/student-edit.module').then(m => m.StudentEditPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
