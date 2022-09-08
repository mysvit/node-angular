import { Component, OnInit, Renderer2 } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { PictureModel } from '@dto'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
import { UploadHelper } from '@shared/helper/upload-helper'
import { FieldValidators } from '@shared/validators'
import { finalize, map } from 'rxjs'
import { UserProfileService } from '../user-profile.service'
import { UserPublicProfileModel } from './user-public-profile-model'
import { UserPublicProfileService } from './user-public-profile.service'

@Component({
    selector: 'app-user-public-profile',
    templateUrl: './user-public-profile.component.html',
    styleUrls: ['./user-public-profile.component.scss']
})
export class UserPublicProfileComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    formModel = new UserPublicProfileModel()

    constructor(
        private renderer: Renderer2,
        private snackBar: SnackBarService,
        private states: StatesService,
        private userPublicProfile: UserPublicProfileService,
        private userProfile: UserProfileService
    ) {
        super()
    }

    ngOnInit(): void {
        this.execute(this.loadModel())
    }

    private loadModel() {
        return this.userProfile.getUserProfile()
            .pipe(
                map(data => this.formModel.formGroup.patchValue(data))
            )
    }

    updateProfileClick() {
        // this.processLayer(this.renderer)
        this.snackBar.show('Test message', MessageType.Info)
    }

    createGravatarCommand() {
        this.snackBar.dismiss()
        const pictureModel = <PictureModel>{
            name: this.formModel.nickname.value.substring(0, 1),
            height: 56,
            width: 56,
            ext: 'png'
        }
        pictureModel.contentBase64 = PictureHelper.createImageFromLetter(pictureModel.name, pictureModel.height, pictureModel.width)
        this.execute(
            this.userPublicProfile.pictureUpdate(pictureModel)
                .pipe(
                    finalize(() => this.snackBar.show('Picture profile uploaded successfully', MessageType.Info))
                )
        )
    }

    uploadPictureCommand() {
        this.snackBar.dismiss()
        UploadHelper.uploadFileClick(this.renderer)
            .then(files => UploadHelper.uploadFileReader(files[0]))
            .then(file => PictureHelper.resizePicture(file, 128, 128))
            .then(pictureModel => this.userPublicProfile.pictureUpdate(pictureModel))
            .catch(error => this.snackBar.show(error.message, MessageType.Error))
            .then(() => this.snackBar.show('Picture profile uploaded successfully', MessageType.Info))
    }

}
