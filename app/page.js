import ChiffreAffaires from '../components/chiffreAffaires/ChiffreAffaires';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
        <div>
          <ChiffreAffaires chiffrePotentiel='500 000'/>
        </div>
    </main>
  );
}
