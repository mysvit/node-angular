import { Component, OnInit, Renderer2 } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { StatesService } from '@core/services/states.service'
import { PictureHelper } from '@static/helper'
import { UploadHelper } from '@static/helper/upload-helper'

@Component({
    selector: 'app-user-public-profile',
    templateUrl: './user-public-profile.component.html',
    styleUrls: ['./user-public-profile.component.scss']
})
export class UserPublicProfileComponent implements OnInit {

    imgSrc: any

    constructor(
        private renderer: Renderer2,
        private snackBar: MatSnackBar,
        public states: StatesService) {
    }

    ngOnInit(): void {
    }

    // fileChanged(file: any) {
    //     this.uploadFile(file.target.files[0])
    // }

    updateProfileClick() {
        console.debug('updateProfileClick')
    }

    clearPictureCommand() {
        this.imgSrc = undefined
    }

    uploadPictureCommand() {
        UploadHelper.uploadFileClick(this.renderer)
            .then(files => UploadHelper.uploadFileReader(files[0]))
            .then(file => PictureHelper.resizePicture(file, 40, 40))
            .then(picture => this.imgSrc = picture.content)
            .catch(error => {
                this.snackBar.open(error.message, 'close', {panelClass: 'sl-snack-error'})
            })
    }

}
