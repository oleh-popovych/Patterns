interface AssetType {
    contract: string,
    tokenId: string,
    name: string,
}

interface NfrProvider {
    getAsset(contract: string, tokenId: string): AssetType;

    getAssets(): AssetType[];
}

class OpenseaProvider implements NfrProvider {
    getAsset(contract: string, tokenId: string): AssetType {
        return {
            contract,
            tokenId,
            name: `#${tokenId}#`
        }
    }

    getAssets(): AssetType[] {
        const assets = [];

        for (let i = 0; i <= 100; i++) {
            assets.push(this.getAsset('contract_'+ i, 'tokenId_' + i));
        }

        return assets;
    }
}

class MoralisProvider implements NfrProvider {
    private assets: AssetType[];

    constructor() {
        for (let i = 0; i <= 100; i++) {
            this.assets.push({
                contract: 'contract_'+ i,
                tokenId: 'tokenId_' + i,
                name: '#' + i + '#',
            });
        }
    }

    getAsset(contract: string, tokenId: string): AssetType {
        const res = this.assets.filter(a => a.contract === contract && a.tokenId === tokenId);
        return res[0];
    }

    getAssets(): AssetType[] {
        return this.assets;
    }
}

class Gallery {
    private provider: NfrProvider;

    constructor(provider) {
        this.provider = provider;
    }

    public getSpecificAsset(contract: string, tokenId: string): AssetType {
        return this.provider.getAsset(contract, tokenId);
    }

    public getAssetsForPage(page: number, limit: number): AssetType[] {
        const assets: AssetType[] = this.provider.getAssets();

        const start = (page - 1) * limit;
        const end = start + limit;

        return  assets.slice(start, end);
    }
}

const opensea = new OpenseaProvider();
const moralis = new MoralisProvider();

const openseaGallery = new Gallery(opensea);
const moralisGallery = new Gallery(moralis);

console.log('Opensea:');
console.log('Specific asset:');
console.log(openseaGallery.getSpecificAsset('123', '456'));
console.log('\nFirst page:');
console.log(openseaGallery.getAssetsForPage(1, 5));

console.log('--------------');
console.log('');

console.log('Moralis:');
console.log('Specific asset:');
console.log(moralisGallery.getSpecificAsset('123', '456'));
console.log('\nFirst page:');
console.log(moralisGallery.getAssetsForPage(1, 5));
