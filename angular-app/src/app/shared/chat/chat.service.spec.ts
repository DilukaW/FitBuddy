import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';


describe('ChatService', () => {
  let injector: TestBed;
  let service: ChatService;
  let httpMock: HttpTestingController;

  let fakeChat: Chat= {
   message:"hello"
  };
  let fakeSenderId="01";
  let fakeReceiverId="02";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService],
    });

    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created ChatService', () => {
    expect(service).toBeTruthy();
  });

  describe('#addUserChat', () => {
    it('should return an Observable for addUserChat', (done: DoneFn) => {
      service.addUserChat(fakeChat).subscribe({
        next: (chat) => {
          expect(chat).toEqual(fakeChat);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('chats/addUser');
      expect(req.request.method).toBe('POST');
      req.flush(fakeChat);
    });
  });

  describe('#addTrainerChat', () => {
    it('should return an Observable for addTrainerChat', (done: DoneFn) => {
      service.addTrainerChat(fakeChat).subscribe({
        next: (chat) => {
          expect(chat).toEqual(fakeChat);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('chats/addTrainer');
      expect(req.request.method).toBe('POST');
      req.flush(fakeChat);
    });
  });

  describe('#getUserChat', () => {
    it('should return an Observable for getUserChat', () => {
      service
        .getUserChat(fakeSenderId,fakeReceiverId)
        .subscribe((chat) => {
          expect(chat).toEqual(fakeChat);
        });

      const req = httpMock.expectOne('chats/getUserChat/'+fakeSenderId+'/'+fakeReceiverId);
      expect(req.request.method).toBe('GET');
      req.flush(fakeChat);
    });
  });

  describe('#getTrainerChat', () => {
    it('should return an Observable for getTrainerChat', () => {
      service
        .getTrainerChat(fakeSenderId,fakeReceiverId)
        .subscribe((chat) => {
          expect(chat).toEqual(fakeChat);
        });

      const req = httpMock.expectOne('chats/getTrainerChat/'+fakeSenderId+'/'+fakeReceiverId);
      expect(req.request.method).toBe('GET');
      req.flush(fakeChat);
    });
  });

  describe('#getTChat', () => {
    it('should return an Observable for getTChat', () => {
      service
        .getTChat(fakeSenderId,fakeReceiverId)
        .subscribe((chat) => {
          expect(chat).toEqual(fakeChat);
        });

      const req = httpMock.expectOne('chats/getTChat/'+fakeSenderId+'/'+fakeReceiverId);
      expect(req.request.method).toBe('GET');
      req.flush(fakeChat);
    });
  });

  describe('#getUChat', () => {
    it('should return an Observable for getUChat', () => {
      service
        .getUChat(fakeSenderId,fakeReceiverId)
        .subscribe((chat) => {
          expect(chat).toEqual(fakeChat);
        });

      const req = httpMock.expectOne('chats/getUChat/'+fakeSenderId+'/'+fakeReceiverId);
      expect(req.request.method).toBe('GET');
      req.flush(fakeChat);
    });
  });
});
