export class FormDataService {
	private appendDatas(formData: FormData, data: any, parentKey?: string | number) {
		if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
			Object.keys(data).forEach((key) => {
				try {
					const index = Number(key);
					if (Number.isNaN(index)) throw '';
					this.appendDatas(formData, data[index], parentKey ? `${parentKey}[${index}].` : index);
				} catch (error) {
					const newKey = !!parentKey ? ((parentKey as string).endsWith('.') ? parentKey : parentKey + '.') + key : key;

					if (data[key] instanceof Array) {
						const files = (data[key] as Array<any>).find((_data: any) => _data instanceof File || typeof _data !== 'object');

						if (files !== undefined) {
							(data[key] as []).forEach((_file: any) => (_file instanceof File ? formData.append(newKey, _file, _file.name) : formData.append(newKey, _file)));
							return;
						}
					}

					this.appendDatas(formData, data[key], newKey);
				}
			});
		} else {
			const value = data == null ? '' : data;

			formData.append((parentKey || '').toString(), value);
		}
	}

	buildFormData(data: any) {
		const formData = new FormData();
		this.appendDatas(formData, data);
		return formData;
	}
}
