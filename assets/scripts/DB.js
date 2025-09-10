class LocalDataBase {
    constructor(key) {
        this.key = key;
        this.data = this.loadData();
    }

    loadData(key) {
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
        if(this.cb)
            this.cb();
    }

    onAdd(cb) {
        this.cb = cb;
    }
}