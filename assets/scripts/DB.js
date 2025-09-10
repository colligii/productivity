class LocalDataBase {
    constructor(key) {
        this.key = key;
        this.data = this.loadData();
    }

    loadData() {
        try {
            const data = localStorage.getItem(this.key) ?? [];
            return JSON.parse(data);
        } catch(e) {
            return [];
        }
    }

    getDataStructuredClone() {
        return structuredClone(this.data)
    }

    commitChanges(data) {
        this.data = data;
        localStorage.setItem(this.key, JSON.stringify(data))
        if(this.onChangeCb)
            this.onChangeCb()
    }

    onChange(onChangeCb) {
        this.onChangeCb = onChangeCb;
    }
}