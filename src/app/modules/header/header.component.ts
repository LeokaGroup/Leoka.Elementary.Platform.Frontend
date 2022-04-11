import { Component, OnInit } from "@angular/core";
import { CommonDataService } from "../base/services/common.service";
import { RoleService } from "../user/services/role.service";

@Component({
    selector: "header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

/**
 * Класс модуля хидера сервиса.
 */
export class HeaderModule implements OnInit {
    constructor(private readonly roleService: RoleService) {};

    public async ngOnInit() {        
        await this.roleService.refreshToken();
    };    
}
