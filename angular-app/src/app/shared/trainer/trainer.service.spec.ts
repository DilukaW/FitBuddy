import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Trainer } from './trainer.model';
import { TrainerService } from './trainer.service';

describe('TrainerService', () => {
  let injector: TestBed;
  let service: TrainerService;
  let httpMock: HttpTestingController;

  let fakeTrainer: Trainer = {
    _id: '01',
    uname: 'tom',
    area: 'yoga',
    description: 'new',
    image: '',
    email: 'tom@gmial.com',
    password: '1234',
  };

  let fakeTrainers: Trainer[] = [
    {
      _id: '02',
      uname: 'sam',
      area: 'cross fit',
      description: 'new',
      image: '',
      email: 'sam@gmial.com',
      password: '12345',
    },
    {
      _id: '01',
      uname: 'tom',
      area: 'yoga',
      description: 'new',
      image: '',
      email: 'tom@gmial.com',
      password: '1234',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrainerService],
    });

    service = TestBed.inject(TrainerService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created TrainerService', () => {
    expect(service).toBeTruthy();
  });

  describe('#registerTrainer', () => {
    it('should return an Observable<Trainer>', (done: DoneFn) => {
      service.registerTrainer(fakeTrainer).subscribe({
        next: (trainer) => {
          expect(trainer).toEqual(fakeTrainer);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('trainers/register');
      expect(req.request.method).toBe('POST');
      req.flush(fakeTrainer);
    });
  });

  describe('#loginTrainer', () => {
    it('should return an Observable for loginTrainer', () => {
      service
        .loginTrainer({ email: 'tom@gmial.com', password: '1234' })
        .subscribe((admin) => {
          expect(admin).toEqual({ email: 'tom@gmial.com', password: '1234' });
        });

      const req = httpMock.expectOne('trainers/login');
      expect(req.request.method).toBe('POST');
      req.flush({ email: 'tom@gmial.com', password: '1234' });
    });
  });

  describe('#getTrainerProfile', () => {
    it('should return Observable for getTrainerProfile', (done: DoneFn) => {
      service.getTrainerProfile().subscribe({
        next: (trainer) => {
          expect(trainer).toEqual(fakeTrainer);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('trainers/profile');
      expect(req.request.method).toBe('GET');
      req.flush(fakeTrainer);
    });
  });

  describe('#getAllTrainers', () => {
    it('should return Observable for getAllTrainers', (done: DoneFn) => {
      service.getAllTrainers().subscribe({
        next: (trainers) => {
          expect(trainers).toEqual(fakeTrainers);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('trainers/all');
      expect(req.request.method).toBe('GET');
      req.flush(fakeTrainers);
    });
  });

  describe('#getTrainerById', () => {
    it('should return Observable for getTrainerById', (done: DoneFn) => {
      service.getTrainerById('01').subscribe({
        next: (trainer) => {
          expect(trainer).toEqual(fakeTrainer);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('trainers/01');
      expect(req.request.method).toBe('GET');
      req.flush(fakeTrainer);
    });
  });

  describe('#updateTrainerById', () => {
    it('should return Observable for updateTrainerById', (done: DoneFn) => {
      service.updateTrainerById('01', 'img', fakeTrainer).subscribe({
        next: (trainer) => {
          expect(trainer).toEqual(fakeTrainer);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('trainers/01');
      expect(req.request.method).toBe('PUT');
      req.flush(fakeTrainer);
    });
  });

  describe('#addTrainees', () => {
    it('should return Observable for addTrainees', (done: DoneFn) => {
      service.addTrainees('01', { id: '04', uname: 'sam' }).subscribe({
        next: (trainer) => {
          expect(trainer).toEqual(fakeTrainer);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('trainers/trainees/01');
      expect(req.request.method).toBe('PUT');
      req.flush(fakeTrainer);
    });
  });

  describe('#deleteTrainerById', () => {
    it('should return Observable for deleteTrainerById', (done: DoneFn) => {
      service.deleteTrainerById('01').subscribe({
        next: (trainer) => {
          expect(trainer).toEqual(fakeTrainer);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('trainers/01');
      expect(req.request.method).toBe('DELETE');
      req.flush(fakeTrainer);
    });
  });
});
