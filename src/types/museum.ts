export interface MuseumItem {
  id: string;
  type: 'exhibition' | 'collection' | 'workshop' | 'event' | 'tour';
  title: string;
  description: string;
  image: string;
  location: string;
  category: string;
  price: number;
  availability?: string;
  time?: string;
  duration?: string;
  ageGroup?: string;
  capacity?: number;
  instructor?: string;
  date?: string;
}

export interface Exhibition extends MuseumItem {
  type: 'exhibition';
  availability: string;
  time: string;
}

export interface Collection extends MuseumItem {
  type: 'collection';
}

export interface Workshop extends MuseumItem {
  type: 'workshop' | 'tour';
  duration: string;
  ageGroup: string;
  capacity: number;
  instructor: string;
}

export interface Event extends MuseumItem {
  type: 'event';
  date: string;
  time: string;
}

export interface Tour extends MuseumItem {
  type: 'tour';
  duration: string;
}

export interface MuseumData {
  exhibitions: Exhibition[];
  collections: Collection[];
  workshops: Workshop[];
  events: Event[];
  tours: Tour[];
}
