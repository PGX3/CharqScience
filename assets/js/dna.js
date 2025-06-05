
  const tabelaCodons = {
    'UUU':'Fenilalanina','UUC':'Fenilalanina','UUA':'Leucina','UUG':'Leucina',
    'CUU':'Leucina','CUC':'Leucina','CUA':'Leucina','CUG':'Leucina',
    'AUU':'Isoleucina','AUC':'Isoleucina','AUA':'Isoleucina','AUG':'Metionina (Início)',
    'GUU':'Valina','GUC':'Valina','GUA':'Valina','GUG':'Valina',
    'UCU':'Serina','UCC':'Serina','UCA':'Serina','UCG':'Serina',
    'CCU':'Prolina','CCC':'Prolina','CCA':'Prolina','CCG':'Prolina',
    'ACU':'Treonina','ACC':'Treonina','ACA':'Treonina','ACG':'Treonina',
    'GCU':'Alanina','GCC':'Alanina','GCA':'Alanina','GCG':'Alanina',
    'UAU':'Tirosina','UAC':'Tirosina','UAA':'Parada','UAG':'Parada',
    'CAU':'Histidina','CAC':'Histidina','CAA':'Glutamina','CAG':'Glutamina',
    'AAU':'Asparagina','AAC':'Asparagina','AAA':'Lisina','AAG':'Lisina',
    'GAU':'Ácido aspártico','GAC':'Ácido aspártico','GAA':'Ácido glutâmico','GAG':'Ácido glutâmico',
    'UGU':'Cisteína','UGC':'Cisteína','UGA':'Parada','UGG':'Triptofano',
    'CGU':'Arginina','CGC':'Arginina','CGA':'Arginina','CGG':'Arginina',
    'AGU':'Serina','AGC':'Serina','AGA':'Arginina','AGG':'Arginina',
    'GGU':'Glicina','GGC':'Glicina','GGA':'Glicina','GGG':'Glicina'
  };

  function transcrever(dna) {
    return dna.toUpperCase().replace(/T/g, 'U');
  }

  function traduzir(rna) {
    const proteina = [];
    for (let i = 0; i < rna.length; i += 3) {
      const codon = rna.slice(i, i + 3);
      if (codon.length < 3) break;
      const aa = tabelaCodons[codon];
      if (aa === 'Parada') break;
      proteina.push({ codon, aa: aa || '???' });
    }
    return proteina;
  }

  function processar() {
    const dna = document.getElementById('dnaInput').value.replace(/[^ATCG]/gi, '').toUpperCase();
    if (!dna) {
      alert('Por favor, insira uma sequência válida de DNA!');
      return;
    }

    const rna = transcrever(dna);
    const proteina = traduzir(rna);

    // Mostrar RNA com códons destacados
    const codons = [];
    for (let i = 0; i < rna.length; i += 3) {
      codons.push(rna.slice(i, i + 3));
    }
    document.getElementById('rnaOutput').innerHTML = codons.map(c => `<span class="codon">${c}</span>`).join(' ');

    // Mostrar proteína com badges
    if (proteina.length === 0) {
      document.getElementById('proteinaOutput').innerHTML = '<span class="text-danger">Nenhuma proteína formada.</span>';
    } else {
      document.getElementById('proteinaOutput').innerHTML = proteina.map(p =>
        `<span class="amino">${p.aa}</span>`
      ).join('');
    }
  }

  function limpar() {
    document.getElementById('dnaInput').value = '';
    document.getElementById('rnaOutput').innerHTML = '';
    document.getElementById('proteinaOutput').innerHTML = '';
  }

  let dnaOriginal = '';

function processar() {
  dnaOriginal = document.getElementById('dnaInput').value.replace(/[^ATCG]/gi, '').toUpperCase();
  if (!dnaOriginal) {
    alert('Por favor, insira uma sequência válida de DNA!');
    return;
  }
  atualizarVisual();
}

function atualizarVisual() {
  const rna = transcrever(dnaOriginal);
  const proteina = traduzir(rna);

  // Mostrar DNA
  document.getElementById('dnaAtual').innerHTML = dnaOriginal.split('').map(c => `<span>${c}</span>`).join('');

  // Mostrar RNA
  const codons = [];
  for (let i = 0; i < rna.length; i += 3) {
    codons.push(rna.slice(i, i + 3));
  }
  document.getElementById('rnaOutput').innerHTML = codons.map(c => `<span class="codon">${c}</span>`).join(' ');

  // Mostrar proteína
  if (proteina.length === 0) {
    document.getElementById('proteinaOutput').innerHTML = '<span class="text-danger">Nenhuma proteína formada.</span>';
  } else {
    document.getElementById('proteinaOutput').innerHTML = proteina.map(p =>
      `<span class="amino">${p.aa}</span>`
    ).join('');
  }
}

function aplicarMutacao() {
  const tipo = document.getElementById('tipoMutacao').value;
  const pos = parseInt(document.getElementById('posicaoMutacao').value) - 1;
  const base = document.getElementById('baseMutacao').value.toUpperCase();

  if (isNaN(pos) || pos < 0 || pos >= dnaOriginal.length && tipo !== 'inserir') {
    alert('Posição inválida.');
    return;
  }

  if ((tipo === 'substituir' || tipo === 'inserir') && !/[ATCG]/.test(base)) {
    alert('Base inválida. Use A, T, C ou G.');
    return;
  }

  let dnaArray = dnaOriginal.split('');

  if (tipo === 'substituir') {
    dnaArray[pos] = base;
  } else if (tipo === 'inserir') {
    dnaArray.splice(pos, 0, base);
  } else if (tipo === 'deletar') {
    dnaArray.splice(pos, 1);
  }

  dnaOriginal = dnaArray.join('');
  atualizarVisual();
}

function limpar() {
  document.getElementById('dnaInput').value = '';
  dnaOriginal = '';
  document.getElementById('rnaOutput').innerHTML = '';
  document.getElementById('proteinaOutput').innerHTML = '';
  document.getElementById('dnaAtual').innerHTML = '';
}

