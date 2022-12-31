import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;

  let fakeBodyParts = ['chest', 'neck', 'back', 'leg'];
  let fakeExercisesByBodyPart = ['situp', 'crunch', 'plank', 'cycle'];
  let fakeAllExercise = [
    {
      id: '01',
      name: 'situp',
      target: 'abs',
      equipment: 'body',
    },
    {
      id: '02',
      name: 'pushup',
      target: 'shoulder',
      equipment: 'body',
    },
  ];
  let fakeExercise = {
    id: '01',
    name: 'situp',
    target: 'abs',
    equipment: 'body',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created ApiService', () => {
    expect(service).toBeTruthy();
  });

  describe('#getBodyParts', () => {
    it('should return an Observable for getBodyParts', (done: DoneFn) => {
      service.getBodyParts().subscribe({
        next: (part) => {
          expect(part).toEqual(fakeBodyParts);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('bodyPartList');
      expect(req.request.method).toBe('GET');
      req.flush(fakeBodyParts);
    });
  });

  describe('#getAllExercises', () => {
    it('should return an Observable for getAllExercises', () => {
      service.getAllExercises().subscribe((exercises) => {
        expect(exercises).toEqual(fakeAllExercise);
      });

      const req = httpMock.expectOne('exercises');
      expect(req.request.method).toBe('GET');
      req.flush(fakeAllExercise);
    });
  });

  describe('#getExercisesByBodyPart', () => {
    it('should return an Observable for getExercisesByBodyPart', () => {
      service.getExercisesByBodyPart('chest').subscribe((exercise) => {
        expect(exercise).toEqual(fakeExercise);
      });

      const req = httpMock.expectOne('part/chest');
      expect(req.request.method).toBe('GET');
      req.flush(fakeExercise);
    });
  });

  describe('#getExerciseById', () => {
    it('should return an Observable for getExerciseById', () => {
      service.getExerciseById('01').subscribe((exercise) => {
        expect(exercise).toEqual(fakeExercise);
      });

      const req = httpMock.expectOne('exerciseId/01');
      expect(req.request.method).toBe('GET');
      req.flush(fakeExercise);
    });
  });

  describe('#ExercisesByEquipment', () => {
    it('should return an Observable for ExercisesByEquipment', () => {
      service.getExercisesByEquipment('body').subscribe((exercise) => {
        expect(exercise).toEqual(fakeExercise);
      });

      const req = httpMock.expectOne('equipmentName/body');
      expect(req.request.method).toBe('GET');
      req.flush(fakeExercise);
    });
  });

  describe('#ExercisesByMussel', () => {
    it('should return an Observable for ExercisesByMussel', () => {
      service.getExercisesByMussel('chest').subscribe((exercise) => {
        expect(exercise).toEqual(fakeExercise);
      });

      const req = httpMock.expectOne('targetMussel/chest');
      expect(req.request.method).toBe('GET');
      req.flush(fakeExercise);
    });
  });
});
