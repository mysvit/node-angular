import { Component, OnInit, Renderer2 } from '@angular/core'
import { StatesService } from '@core/services/states.service'
import { ImageHelper } from '@static/helper'
import { FileHelper } from '@static/helper/file-helper'

@Component({
    selector: 'app-user-public-profile',
    templateUrl: './user-public-profile.component.html',
    styleUrls: ['./user-public-profile.component.scss']
})
export class UserPublicProfileComponent implements OnInit {

    imgSrc: any

    constructor(
        private renderer: Renderer2,
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
        FileHelper.uploadFileClick(this.renderer)
            .then((file: any) => FileHelper.fileReader(file.target.files[0]))
            .then((resolve: any) => {
                    console.debug(resolve)
                    ImageHelper.compressImage(resolve.target.result, 40, 40).then(compressed => {
                        this.imgSrc = compressed
                    })

                },
                error => {
                    console.error(error)
                }
            )
    }

    // private uploadFile(file: File) {
    //     const that = this
    //     const reader = new FileReader()
    //     reader.onloadstart = function () {
    //         console.debug('Upload LoadStart: ' + file.name)
    //         // file.status = UploadSatus.Uploading;
    //     }
    //     reader.onload = function (event: Event) {
    //         that.Load(event, file)
    //     }
    //     reader.onerror = function (event: Event) {
    //         console.error({name: 'Upload Error: ' + file.name, obj: event})
    //         // file.status = UploadSatus.Error;
    //     }
    //     reader.readAsDataURL(file)
    // }

    private Load(event: Event, file: any) {
        const src: any = event.target
        // this.imgSrc = src.result

        ImageHelper.compressImage(src.result, 40, 40).then(compressed => {
            this.imgSrc = compressed
        })
        // this.imgSrc = src.result
        // console.debug('imgSrc', this.imgSrc)
        // const index = src.result.indexOf(';base64,');
        // this.imgSrc = src.result.substring(index + 8);
        // file.event = event;
    }

}

