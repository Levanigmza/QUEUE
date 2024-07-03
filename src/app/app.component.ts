import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet  , CommonModule , HttpClientModule],
  providers:[HttpClient , ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testapp';
  currentTranslations: any = {};

  constructor(private http:HttpClient) {
    this.loadTranslations('geo');

  }
  Loader: boolean = false;

  changeLanguage(language: string) {
    this.loadTranslations(language);
  }

  selectService(service: string) {
    console.log(`Selected service: ${service}`);
    this.Loader = true;
    setTimeout(() => {
      this.Loader = false;
    }, 2000);
  }
  

  loadTranslations(lang: string) {
    this.http.get('/assets/translations.json').subscribe(
      (translations: any) => {
        this.currentTranslations = translations[lang];
      },
      (error) => {
        console.error(`Error loading translations for ${lang}:`, error);
      }
    );
  }
}
