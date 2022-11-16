import { Utils } from '../resources/Utils';

export class Verify {
	verify() {
		if (sessionStorage.getItem('token')) {
			if (sessionStorage.getItem('role') !== 'admin') {
				if (sessionStorage.getItem('role') !== 'sudosu') {
					Utils.swalNeddLogin('Rol no autorizado');
				}
			}
		} else {
			Utils.swalNeddLogin('Acceso denegado');
		}
	}

	securityVerify(rol) {
		if (
			this.getNumbLevel(sessionStorage.getItem('role')) < this.getNumbLevel(rol)
		) {
			return false;
		} else {
			return true;
		}
	}

	getNumbLevel(typeU) {
		switch (typeU) {
			case 'client':
				return 1;
			case 'employee':
			case 'employe':
				return 2;
			case 'admin':
				return 3;
			case 'sudosu':
				return 4;
		}
	}

	verifyToken() {
		if (sessionStorage.getItem('token')) {
			return true;
		} else {
			Utils.swalNeddLogin('Acceso denegado');
			return false;
		}
	}

	MenuTypeUser(props) {
		if (sessionStorage.getItem('token')) {
			props.push('/superAdminMenu');
		} else {
			Utils.swalNeddLogin('Acceso denegado');
			props.push('/login');
		}
	}

	distanceColor(color1, color2) {
		const res =
			(((color2[0] - color1[0]) * 2 +
				(color2[1] - color1[1]) * 2 +
				(color2[2] - color1[2]) * 2) *
				1) /
			2;
		return res;
	}

	verifyQrColor(centerColor, backgroundColor, cornerColor) {
		let msg = '';		
		if (centerColor !== backgroundColor && centerColor !== cornerColor) {
			if(this.colorRGB(centerColor, backgroundColor) === false){
				msg =
					'Hay una similitud de colores entre Color del centro y Color del fondo.';
				Utils.swalQrAlert(msg);
			}else if (this.colorRGB(cornerColor, backgroundColor) === false) {
				msg =
					'Hay una similitud de colores entre Color del fondo y Color de esquina.';
				Utils.swalQrAlert(msg);
			}
		}
	}

	colorRGB = (a, b) => {
		const order = [[0,1,2], [1,0,2], [2,0,1]]; 
		const isValid = [true, true, true]; 
		const isFacti = [true, true, true]; 
		for(let i = 0 ; i <= 2 ; i++){
			if(Math.abs(a[order[i][0]] - b[order[i][0]]) <= 35){
				if(Math.abs(a[order[i][1]] - b[order[i][1]]) <= 35){
					isValid[2] = false; 
				}else{
					isValid[2] = true; 
				}
				if(Math.abs(a[order[i][2]] - b[order[i][2]]) <= 35){
					isValid[2] = false; 
				}else{
					isValid[2] = true; 
				}
				
				if(isValid[1] === true && isValid[2] === true){
					isValid[0] = true; 
				}else{
					isValid[0] = false; 
				}

				if(isValid[0] === true && isValid[1] === true && isValid[2] === true){
					isFacti[i] = true; 
				}else{
					isFacti[i] = false; 
				}
			}
		}
		if(isValid.includes(false)){
			return false; 
		}else{
			return true; 
		}
	}

}
