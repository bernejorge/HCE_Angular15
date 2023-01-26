import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/services/config.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-olvido-su-pass',
  templateUrl: './olvido-su-pass.component.html',
  styleUrls: ['./olvido-su-pass.component.css']
})
export class OlvidoSuPassComponent implements OnInit {

  url: string = ""; // environment.URL_TO_PASS;
  constructor(public activeModal: NgbActiveModal, public configSrv: ConfigService) { 

    this.configSrv.getConfigJson().subscribe(
      (res: any) => {
        this.url = res.URL_TO_PASS;
      }
    );
    
  }

  ngOnInit() {
  }

}
